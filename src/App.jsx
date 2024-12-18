import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Top_Rated from "./Components/Top_Rated";
import Navigation from "./Components/Navigation";
import Upcommings from "./Components/Upcommings";
import Home from "./Components/Home";
import Details from "./Components/Details";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Router>
      <div className="">
        <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/top-rated" element={<Top_Rated searchTerm={searchTerm} />} />
          <Route path="/upcoming" element={<Upcommings searchTerm={searchTerm} />} />
          <Route path="/movie/:id" element={<Details />} />

        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
