from internal import app, db

class cases(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), unique = True, nullable = False)

    def __repr__(self):
        return f"Case Name (name = {self.name})"

class Evidence(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50), unique = True, nullable = False)
    filter_exp = db.Column(db.String(200), unique = True, nullable = False)
    output_file = db.Column(db.String(20), unique = True, nullable = False)
    commands = db.Column(db.String(400), unique = False, nullable = False)
    cases_id = db.Column(db.Integer, db.ForeignKey('cases.id'), nullable = False)
    query_result = db.Column(db.Text)

    def __repr__(self):
        return f"Command name (name = {self.title}, filter_exp = {self.filter_exp}, output_file = {self.output_file}, commands = {self.commands}, cases_id = {self.cases_id}, query_result = {self.query_result})"
    
with app.app_context():
    db.create_all()

