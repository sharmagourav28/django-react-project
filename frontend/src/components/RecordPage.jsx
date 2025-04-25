import React, { useEffect, useState } from "react";
import "./recordPage.css";

const RecordPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch records from the backend
    fetch("http://localhost:8000/api/records/") // Change to your API URL
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

  const handleDownload = (serialNumber) => {
    // Logic for downloading the result (e.g., generating a PDF)
    alert(`Downloading result for Serial No: ${serialNumber}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="record-page-container">
      <h1>Records</h1>
      <table className="record-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>PNR Number</th>
            <th>Result</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.serial_number}>
              <td>{record.serial_number}</td>
              <td>{record.pnr_number}</td>
              <td
                className={
                  record.result === "Eligible"
                    ? "result-eligible"
                    : "result-not-eligible"
                }
              >
                {record.result}
              </td>
              <td>
                <button
                  className="download-btn"
                  onClick={() => handleDownload(record.serial_number)}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordPage;
