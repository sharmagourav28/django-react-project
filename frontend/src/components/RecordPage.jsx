import React, { useEffect, useState } from "react";
import "./recordPage.css";

const RecordPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/records/")
      .then((response) => response.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
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
          {records.map((record) => {
            const total =
              record.dbms +
              record.stats +
              record.big_data +
              record.python +
              record.ml +
              record.visualization +
              record.java +
              record.cloud;

            const percentage = (total / 320) * 100;
            const isEligible = percentage >= 60;

            return (
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
                <td>{total}</td>
                <td>{percentage.toFixed(2)}%</td>
                <td
                  className={
                    isEligible ? "result-eligible" : "result-not-eligible"
                  }
                >
                  {isEligible ? "✅ Eligible" : "❌ Not Eligible"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordPage;
