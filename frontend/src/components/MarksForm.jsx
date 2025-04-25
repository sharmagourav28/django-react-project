import React, { useState } from "react";
import axios from "axios";
import "./marksform.css";

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
        <div className="result-container">
          <h2>✅ Result: {resultData.result}</h2>
          <p>
            📊 Percentage:{" "}
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
