import React, { useEffect, useState } from "react";
import "./recordPage.css";

const RecordPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch records from the backend
    fetch("http://localhost:8000/api/records/") // Ensure this URL is correct
      .then((response) => response.json())
      .then((data) => {
        setRecords(data); // Store fetched data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="record-page-container">
      <h1>Records</h1>
      <table className="record-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>PNR Number</th>
            <th>DBMS</th>
            <th>Statistics</th>
            <th>Big Data</th>
            <th>Python</th>
            <th>Machine Learning</th>
            <th>Data Visualization</th>
            <th>Java</th>
            <th>Cloud</th>
            <th>Total Marks</th>
            <th>Percentage</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.pnr_number}>
              <td>{record.student_name}</td>
              <td>{record.pnr_number}</td>
              <td>{record.dbms}</td>
              <td>{record.stats}</td>
              <td>{record.big_data}</td>
              <td>{record.python}</td>
              <td>{record.ml}</td>
              <td>{record.visualization}</td>
              <td>{record.java}</td>
              <td>{record.cloud}</td>
              <td>
                {record.dbms +
                  record.stats +
                  record.big_data +
                  record.python +
                  record.ml +
                  record.visualization +
                  record.java +
                  record.cloud}
              </td>
              <td>
                {((record.dbms +
                  record.stats +
                  record.big_data +
                  record.python +
                  record.ml +
                  record.visualization +
                  record.java +
                  record.cloud) /
                  320) *
                  100}
              </td>
              <td
                className={
                  (record.dbms +
                    record.stats +
                    record.big_data +
                    record.python +
                    record.ml +
                    record.visualization +
                    record.java +
                    record.cloud) /
                    320 >=
                  60
                    ? "result-eligible"
                    : "result-not-eligible"
                }
              >
                {(record.dbms +
                  record.stats +
                  record.big_data +
                  record.python +
                  record.ml +
                  record.visualization +
                  record.java +
                  record.cloud) /
                  320 >=
                60
                  ? "Eligible"
                  : "Not Eligible"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordPage;
