import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarksForm from "./components/MarksForm";
import RecordPage from "./components/RecordPage";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      {" "}
      {/* Router should only be here wrapping the whole app */}
      <Header /> {/* This should not wrap anything with Router */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marks" element={<MarksForm />} />
        <Route path="/records" element={<RecordPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
