import React, { useState } from "react";
import axios from "axios";
import "./marksform.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const MarksForm = () => {
  const [formData, setFormData] = useState({
    student_name: "",
    pnr_number: "",
    subjects: {
      Database: 0,
      Statistics: 0,
      Big_data: 0,
      Python_R_Programming: 0,
      Machine_Learning: 0,
      Data_Visualization: 0,
      Java_Programming: 0,
      Linux_Programming_Cloud: 0,
    },
  });

  const [resultData, setResultData] = useState(null);
  const chartData = resultData
    ? Object.entries(formData.subjects).map(([subject, mark]) => ({
        name: subject.replace(/_/g, " "),
        value: parseInt(mark),
      }))
    : [];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#AA336A",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("subjects_")) {
      const subject = name.replace("subjects_", "");
      setFormData((prevState) => ({
        ...prevState,
        subjects: {
          ...prevState.subjects,
          [subject]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/marks/",
        formData
      );
      setResultData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const subjectEntries = Object.entries(formData.subjects);

  const handlePrint = () => {
    const printContent = document.getElementById("printableArea");
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="marks-form-container">
      <h1 className="form-title">📄 Submit Your Marks</h1>
      <form onSubmit={handleSubmit} className="marks-form">
        <div className="row">
          <div className="form-group">
            <label>Student Name</label>
            <input
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>PNR Number</label>
            <input
              type="text"
              name="pnr_number"
              value={formData.pnr_number}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="Enter your PNR number"
            />
          </div>
        </div>

        <div className="subjects-section">
          <h3>📚 Subject Marks</h3>
          {subjectEntries.map(([subject, value], index) =>
            index % 2 === 0 ? (
              <div className="row" key={subject}>
                <div className="form-group">
                  <label>
                    {subject
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                    :
                  </label>
                  <input
                    type="number"
                    name={`subjects_${subject}`}
                    value={value}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    min="0"
                    max="100"
                    placeholder="Enter marks"
                  />
                </div>
                {subjectEntries[index + 1] && (
                  <div className="form-group">
                    <label>
                      {subjectEntries[index + 1][0]
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                      :
                    </label>
                    <input
                      type="number"
                      name={`subjects_${subjectEntries[index + 1][0]}`}
                      value={subjectEntries[index + 1][1]}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      min="0"
                      max="100"
                      placeholder="Enter marks"
                    />
                  </div>
                )}
              </div>
            ) : null
          )}
        </div>

        <button type="submit" className="submit-button">
          🚀 Submit
        </button>
      </form>

      {resultData && (
        <div className="result-container" id="printableArea">
          <h2>✅ Result: {resultData.result}</h2>
          <p>
            📊 Percentage:{" "}
            {resultData.percentage ? resultData.percentage.toFixed(2) : "N/A"}%
          </p>

          <div className="charts-container">
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button onClick={handlePrint} className="print-button">
            🖨️ Print
          </button>
        </div>
      )}
    </div>
  );
};

export default MarksForm;
