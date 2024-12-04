import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Tasklist from "./components/Tasklist.js";
import Addtask from "./components/Addtask.js"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<Addtask/>} />
        <Route path="/" element={<Tasklist />} />
      </Routes>
    </Router>
  );
}

export default App;
