import React from "react";
import "./aboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>About This Project 📚</h1>
      <p className="about-description">
        This project is a full-stack web application designed to manage and
        display student records with live charts and result analysis. It brings
        together modern web technologies for an efficient and user-friendly
        experience! 🚀
      </p>

      <div className="about-tech-stack">
        <h2>Technologies Used 🛠️</h2>
        <ul>
          <li>
            ⚛️ <strong>Frontend:</strong> React.js
          </li>
          <li>
            🐍 <strong>Backend:</strong> Python Django (Django REST Framework)
          </li>
          <li>
            🛢️ <strong>Database:</strong> MySQL
          </li>
          <li>
            📊 <strong>Charts:</strong> Recharts Library
          </li>
          <li>
            🌐 <strong>API:</strong> REST API
          </li>
          <li>
            🎨 <strong>Styling:</strong> CSS3
          </li>
        </ul>
      </div>

      <div className="about-features">
        <h2>Features ✨</h2>
        <ul>
          <li>📈 Live Bar and Pie Charts for Grade Distribution</li>
          <li>📝 Dynamic Top 10 Students Table</li>
          <li>📂 Download Records as CSV and PDF</li>
          <li>🔒 Secure and Organized Backend with Django</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
