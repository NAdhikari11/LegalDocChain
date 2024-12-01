from flask import jsonify, request, render_template # type: ignore
# from flask_cors import CORS # type: ignore
from internal import app, db, api
import subprocess
import google.generativeai as genai # type: ignore
from google.generativeai.types import HarmCategory, HarmBlockThreshold # type: ignore
# from flask_sqlalchemy import SQLAlchemy #type:ignore
from flask_restful import Resource, reqparse, fields, marshal_with #type:ignore
from internal.models import cases, Evidence
from flask import redirect, url_for #type:ignore
import pandas as pd #type:ignore
import re
from dotenv import load_dotenv, dotenv_values #type:ignore
import os

load_dotenv() 


GOOGLE_API_KEY_2 = os.getenv("GOOGLE_API_KEY")

PROMPT = "Consider the following terminal output and provide an explanation for it. The output belongs to a PCAP file from a network based cyber attack. Try to keep the explanation as simple and concise as possible as the person reading it might not have a technical background. Keep the response limited to the explanation of the output and try not to include unnecessary details as this explanation might be viewed in professional, possibly legal, settings."

genai.configure(api_key=GOOGLE_API_KEY_2)
model = genai.GenerativeModel("gemini-1.5-flash")

case_args = reqparse.RequestParser()
case_args.add_argument('name', type = str, required = True, help = "Every case must be assigned a name")

forensics_args = reqparse.RequestParser()
forensics_args.add_argument('title', type = str, required = True, help = "State the purpose of these commands")
forensics_args.add_argument('filter_exp', type = str, required = True, help = "Cannot run without filter expressions")
forensics_args.add_argument('output_file', type = str, required = True, help = "Name the output file where the results will be saved")
forensics_args.add_argument('commands', type = str, required = True, help = "Commands that must be run")

caseFields = {
    'id': fields.Integer,
    'name': fields.String,
}

evidenceFields = {
    'id': fields.Integer,
    'title': fields.String,
    'filter_exp': fields.String,
    'output_file': fields.String,
    'commands': fields.String,
    'cases_id': fields.Integer,
    'query_result': fields.String,
}

class Cases(Resource):
    @marshal_with(caseFields)
    def get(self):
        all_cases = cases.query.all()
        return all_cases
    
    @marshal_with(caseFields)
    def post(self):
        case_arg = case_args.parse_args()
        case = cases(name = case_arg["name"])
        db.session.add(case)
        db.session.commit()
        all_cases = cases.query.all()
        return all_cases, 201

class evidence(Resource):
    @marshal_with(evidenceFields)
    def get(self, case_id):
        all_evidence = Evidence.query.filter_by(cases_id = case_id).all()
        return all_evidence
    
api.add_resource(Cases, '/newCase')
api.add_resource(evidence, '/evidence/<int:case_id>')

fileContent = None
error_message = None

@app.route('/forensics/<int:case_id>', methods=['POST', 'GET'])
@marshal_with(evidenceFields)
def forensics(case_id):
    title = request.form['title']
    inputFile = request.form['inputFile']
    filterExpressions = request.form['filterExpressions']
    outputFile = request.form['outputFile']
    inputCommand = request.form['inputCommand']

    commands = ['tshark', '-r', inputFile, '-Y', filterExpressions]
    flags = inputCommand.split(' ')
    commands.extend(flags)
    print(commands)
    
    with open(outputFile, 'w') as f:
        try:
            res = subprocess.run(commands, stdout=f, stderr=subprocess.PIPE, text = True)

            if res.returncode != 0:
                error_message = res.stderr
                print("The error is: ", error_message)

        except Exception as e:
            error_message = str(e)
            print(f"Exception occurred: {error_message}")

    file = open(outputFile, 'r+')
    fileContent = file.read()
    
    evidence = Evidence(title = title, filter_exp = filterExpressions, output_file = outputFile, commands = inputCommand, cases_id = case_id, query_result = fileContent)
    db.session.add(evidence)
    db.session.commit()


    print(fileContent)
    print()

    if fileContent:
        print(PROMPT + "\n" + fileContent)
        print()

        response = model.generate_content([PROMPT + "\n" + fileContent], safety_settings={
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE
        })
        
        print(response.text)

        return jsonify({"message": "Success"})

    else:
        print("error")

    # evidence_arg = forensics_args.parse_args()

    # case = Cases.query.get(case_id)
    # print(case)
    # if not case:
    #     return jsonify({"error": "Case not found"}), 404

    # evidence = Evidence(title = title, filter_exp = filterExpressions, output_file = outputFile, commands = inputCommand, query_result = fileContent)
    # db.session.add(evidence)
    # db.session.commit()

    if fileContent:
        return jsonify({
            "evidence_id": evidence.id,
            "message": "Evidence saved successfully"
        })
    else:
        print("Error: No content to process.")
        return jsonify({"error": "Failed to generate terminal output"}), 500
    
@app.route('/explain', methods = ['POST', 'GET'])
def explanation():
    # if fileContent:
    #     print(PROMPT + "\n" + fileContent)
    #     print()

    #     response = model.generate_content([PROMPT + "\n" + fileContent], safety_settings={
    #         HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE
    #     })
        
    #     print(response.text)

    data = request.get_json()  # Get JSON data from the request body
    file_content = data.get('fileContent', None)  # Extract fileContent

    if file_content:  # Check if fileContent exists
        try:
            # Assuming you are using your model to generate the explanation
            response = model.generate_content(
                [PROMPT + "\n" + file_content],  # Generate the explanation
                safety_settings={  # Model safety settings
                    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE
                }
            )

            return jsonify({"message": "Success", "explanation": response.text})
    
        except Exception as e:
            # Handle any errors that occur while generating the explanation
            return jsonify({
                "message": "Error generating explanation",
                "error": str(e)
            }), 500

    else:
        return jsonify({
            "message": "Error: fileContent not provided"
        }), 400
    

def parse_log_line(line):
    # Improved regular expression to handle log parsing with correct grouping
    pattern = r'(\S+) - - \[(.*?)\] "(GET|POST|PUT|DELETE) (.*?) HTTP/1\.1" (\d{3}) (\d+)'
    match = re.match(pattern, line)
    if match:
        ip, timestamp, method, path, status, size = match.groups()
        return {
            'ip': ip,
            'timestamp': pd.to_datetime(timestamp, format='%d/%b/%Y:%H:%M:%S %z'),
            'method': method,
            'path': path,
            'status': int(status),
            'size': int(size)
        }
    return None

def analyze_log(log_content):
    log_lines = log_content.strip().split('\n')
    log_data = [parse_log_line(line) for line in log_lines if parse_log_line(line)]
    
    if len(log_data) == 0:
        return {'error': 'No valid log entries found'}
    
    df = pd.DataFrame(log_data)
    
    analysis = {}
    
    # Unique IP addresses
    analysis['unique_ips'] = df['ip'].nunique()
    
    # Top 5 IP addresses
    analysis['top_ips'] = df['ip'].value_counts().head(5).to_dict()
    
    # HTTP status codes
    analysis['status_codes'] = df['status'].value_counts().to_dict()
    
    # Failed logins (assuming 401 status code)
    failed_logins = df[df['status'] == 401]
    analysis['failed_logins'] = len(failed_logins)
    
    # Potential brute force attempts (more than 10 failed logins from same IP)
    potential_brute_force = failed_logins['ip'].value_counts()
    analysis['potential_brute_force'] = potential_brute_force[potential_brute_force > 10].to_dict()
    
    # Potential SQL injection attempts
    sql_injection_pattern = r"(%27|')|(--|#)|(%23)|(\bSELECT\b|\bINSERT\b|\bDELETE\b|\bUPDATE\b)"
    potential_sql_injection = df[df['path'].str.contains(sql_injection_pattern, regex=True, na=False)]
    analysis['potential_sql_injection'] = len(potential_sql_injection)
    
    # Requests over time data
    requests_over_time = df.groupby(df['timestamp'].dt.floor('h')).size().reset_index(name='count')
    requests_over_time['timestamp'] = requests_over_time['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')
    analysis['requests_over_time'] = requests_over_time.to_dict(orient='records')
    
    return analysis

@app.route('/log')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file:
        log_content = file.read().decode('utf-8')
        analysis_result = analyze_log(log_content)
        return jsonify(analysis_result)
    

if __name__ == '__main__':
    app.run(debug=True)
