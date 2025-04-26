import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

const features = [
  {
    title: "📥 Submit Marks",
    description:
      "Easily enter marks for 8 subjects and calculate overall result.",
    color: "bg-blue", // custom class
  },
  {
    title: "📊 Visualize Results",
    description:
      "Interactive pie and bar charts to understand student performance.",
    color: "bg-purple",
  },
  {
    title: "📁 Manage Records",
    description:
      "View all records, check eligibility, and download result PDFs.",
    color: "bg-green",
  },
  {
    title: "ℹ️ About App",
    description: "Learn about the features and goals of the platform.",
    color: "bg-orange",
  },
];

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-hero">
        <h1 className="homepage-title">
          Welcome to Result Management System 🎓
        </h1>
        <p className="homepage-subtitle">
          Submit marks, check eligibility, visualize results and manage student
          data — all in one place.
        </p>
      </div>

      <div className="homepage-features grid-2-cols">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className={`feature-card ${feature.color}`}
          >
            <div className="icon-circle">{feature.title.split(" ")[0]}</div>
            <div>
              <h2 className="feature-title">{feature.title}</h2>
              <p className="feature-description">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="homepage-buttons">
        <Link to="/marks" className="homepage-btn blue">
          Submit Marks
        </Link>
        <Link to="/records" className="homepage-btn green">
          View Records
        </Link>
        <Link to="/about" className="homepage-btn gray">
          About App
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
