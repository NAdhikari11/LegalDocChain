import React, { useState } from 'react';
import Chart from 'chart.js/auto';

const Log = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a log file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      

      if (data.error) {
        setError(data.error);
        return;
      }

      setResults(data);
      setError(null);
    } catch (err) {
      setError('Error analyzing file');
      console.error(err);
    }
  };

  // const displayChart = () => {
  //   if (!results) return;

  //   const ctx = document.getElementById('chart').getContext('2d');
  //   new Chart(ctx, {
  //     type: 'line',
  //     data: {
  //       labels: results.requests_over_time.map((item) => item.timestamp),
  //       datasets: [
  //         {
  //           label: 'Requests Over Time',
  //           data: results.requests_over_time.map((item) => item.count),
  //           borderColor: 'rgb(75, 192, 192)',
  //           tension: 0.1,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         x: {
  //           type: 'time',
  //           time: {
  //             unit: 'hour',
  //             displayFormats: {
  //               hour: 'MMM D, HH:mm',
  //             },
  //           },
  //           title: {
  //             display: true,
  //             text: 'Time',
  //           },
  //         },
  //         y: {
  //           beginAtZero: true,
  //           title: {
  //             display: true,
  //             text: 'Number of Requests',
  //           },
  //         },
  //       },
  //     },
  //   });
  // };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, padding: '20px' }}>
      <h1>Log Forensic Analysis</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" accept=".log" onChange={handleFileChange} />
        <button type="submit">Analyze</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results && (
        <div id="results" style={{ marginTop: '20px' }}>
          <h2>Analysis Results</h2>
          <div className="section" style={{ backgroundColor: '#f4f4f4', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
            <h3>Overview</h3>
            <p>Unique IP Addresses: {results.unique_ips}</p>
            <h4>Top 5 IP Addresses:</h4>
            <ul>
              {Object.entries(results.top_ips).map(([ip, count]) => (
                <li key={ip}>
                  {ip}: {count}
                </li>
              ))}
            </ul>
            <h4>HTTP Status Codes:</h4>
            <ul>
              {Object.entries(results.status_codes).map(([code, count]) => (
                <li key={code}>
                  {code}: {count}
                </li>
              ))}
            </ul>
          </div>

          <div className="section" style={{ backgroundColor: '#f4f4f4', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
            <h3>Security Issues</h3>
            <p>Failed Logins: {results.failed_logins}</p>
            <p>Potential SQL Injection Attempts: {results.potential_sql_injection}</p>
            <h4>Potential Brute Force Attempts:</h4>
            <ul>
              {Object.entries(results.potential_brute_force).map(([ip, count]) => (
                <li key={ip}>
                  {ip}: {count} attempts
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div id="chartContainer" style={{ maxWidth: '800px', marginTop: '20px' }}>
        <canvas id="chart" />
      </div>

      {/* {displayChart()} */}
    </div>
  );
};

export default Log;
