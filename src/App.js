import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Login from "./component/Login";
import PageNotFond from "./component/PageNotFond";
import Navbar from "./component/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFond />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
