import React, { useState } from "react";
import axios from "axios";
import "./marksform.css";

const MarksForm = () => {
  const [formData, setFormData] = useState({
    student_name: "",
    pnr_number: "",
    subjects: {
      DBMS: 0,
      OS: 0,
      Networking: 0,
      Python: 0,
      ML: 0,
      DSA: 0,
      Java: 0,
      Cloud: 0,
    },
  });

  const [resultData, setResultData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [field, subject] = name.split("_");

    if (subject) {
      setFormData({
        ...formData,
        subjects: {
          ...formData.subjects,
          [subject]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
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
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="marks-form-container">
      <h1 className="form-title">Submit Marks</h1>
      <form onSubmit={handleSubmit} className="marks-form">
        <div className="form-group">
          <label>Student Name:</label>
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
          <label>PNR Number:</label>
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
        <div className="subjects-section">
          <h3>Subjects Marks</h3>
          {Object.keys(formData.subjects).map((subject) => (
            <div className="form-group" key={subject}>
              <label>{subject}:</label>
              <input
                type="number"
                name={`subjects_${subject}`}
                value={formData.subjects[subject]}
                onChange={handleInputChange}
                required
                className="input-field"
                min="0"
                max="100"
                placeholder={`Enter ${subject} marks`}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {resultData && (
        <div className="result-container">
          <h2>Result: {resultData.result}</h2>
          <p>
            Percentage:{" "}
            {resultData.percentage ? resultData.percentage.toFixed(2) : "N/A"}%
          </p>
          <div className="charts-container">
            <img
              src={`data:image/png;base64,${resultData.pie_chart}`}
              alt="Pie Chart"
              className="chart"
            />
            <img
              src={`data:image/png;base64,${resultData.bar_chart}`}
              alt="Bar Chart"
              className="chart"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarksForm;
