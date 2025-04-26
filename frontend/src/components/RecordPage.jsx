import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./recordPage.css";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]; // green, blue, yellow, red

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

  const recordsWithPercentage = records.map((record) => {
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
    return { ...record, total, percentage };
  });

  const gradeDistribution = {
    "60%+": 0,
    "70%+": 0,
    "80%+": 0,
    "90%+": 0,
  };

  recordsWithPercentage.forEach((r) => {
    if (r.percentage >= 90) gradeDistribution["90%+"]++;
    else if (r.percentage >= 80) gradeDistribution["80%+"]++;
    else if (r.percentage >= 70) gradeDistribution["70%+"]++;
    else if (r.percentage >= 60) gradeDistribution["60%+"]++;
  });

  const distributionData = Object.keys(gradeDistribution).map((key) => ({
    name: key,
    value: gradeDistribution[key],
  }));

  const topStudents = [...recordsWithPercentage]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 10);

  // Download CSV
  const handleDownloadCSV = () => {
    const headers = [
      "Student Name",
      "PNR Number",
      "DBMS",
      "Statistics",
      "Big Data",
      "Python",
      "Machine Learning",
      "Data Visualization",
      "Java",
      "Cloud",
      "Total Marks",
      "Percentage",
      "Result",
    ];
    const rows = recordsWithPercentage.map((record) => [
      record.student_name,
      record.pnr_number,
      record.dbms,
      record.stats,
      record.big_data,
      record.python,
      record.ml,
      record.visualization,
      record.java,
      record.cloud,
      record.total,
      record.percentage.toFixed(2) + "%",
      record.percentage >= 60 ? "Eligible" : "Not Eligible",
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Records", 14, 10);
    const tableColumn = [
      "Student Name",
      "PNR Number",
      "DBMS",
      "Statistics",
      "Big Data",
      "Python",
      "ML",
      "Data Viz",
      "Java",
      "Cloud",
      "Total",
      "Percentage",
      "Result",
    ];
    const tableRows = [];

    recordsWithPercentage.forEach((record) => {
      const rowData = [
        record.student_name,
        record.pnr_number,
        record.dbms,
        record.stats,
        record.big_data,
        record.python,
        record.ml,
        record.visualization,
        record.java,
        record.cloud,
        record.total,
        record.percentage.toFixed(2) + "%",
        record.percentage >= 60 ? "Eligible" : "Not Eligible",
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 7 },
    });

    doc.save("student_records.pdf");
  };

  return (
    <div className="record-page-container">
      <h1>Records</h1>

      {/* Download Buttons */}
      <div className="download-buttons">
        <button className="download-btn" onClick={handleDownloadCSV}>
          Download CSV
        </button>
        <button className="download-btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="bar-chart">
          <h2>Grade Distribution (Bar Chart)</h2>
          <BarChart width={400} height={300} data={distributionData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6">
              {distributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className="pie-chart">
          <h2>Grade Distribution (Pie Chart)</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={distributionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {distributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Top 10 Students Section */}
      <div className="top-students">
        <h2>Top 10 Students</h2>
        <table className="record-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>PNR Number</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student) => (
              <tr key={student.pnr_number}>
                <td>{student.student_name}</td>
                <td>{student.pnr_number}</td>
                <td>{student.percentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* All Records Table */}
      <h2>All Records</h2>
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
          {recordsWithPercentage.map((record) => {
            const isEligible = record.percentage >= 60;
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
                <td>{record.total}</td>
                <td>{record.percentage.toFixed(2)}%</td>
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
