import React, { useState } from "react";
import axios from "axios";

const MarksForm = () => {
  const [resultData, setResultData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      student_name: "Priyanka",
      pnr_number: "PNR654123",
      subjects: {
        DBMS: 85,
        OS: 75,
        Networking: 80,
        Python: 90,
        ML: 70,
        DSA: 60,
        Java: 85,
        Cloud: 88,
      },
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/marks/",
        payload
      );
      setResultData(response.data);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Submit Marks</h1>
      <button onClick={handleSubmit}>Submit</button>

      {resultData && (
        <div>
          <h2>Result: {resultData.result}</h2>
          <p>
            Percentage:{" "}
            {resultData.percentage ? resultData.percentage.toFixed(2) : "N/A"}%
          </p>
          <img
            src={`data:image/png;base64,${resultData.pie_chart}`}
            alt="Pie Chart"
          />
          <img
            src={`data:image/png;base64,${resultData.bar_chart}`}
            alt="Bar Chart"
          />
        </div>
      )}
    </div>
  );
};

export default MarksForm;
