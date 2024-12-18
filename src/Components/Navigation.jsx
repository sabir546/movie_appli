import React, { useState } from "react";

const Navigation = ({ searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
    
     
      <nav
        className={`fixed top-0 left-0 w-full ${
          isMenuOpen ? "h-70"  : "h-16"
        } bg-slate-800 text-white flex flex-col md:flex-row items-center justify-between px-4 md:px-16 shadow-lg z-50 transition-all duration-300`}
      >
       
        <div className="  flex items-center gap-20 pt-4 md:gap-8 md:pt-0">
         
          <div className="logo font-bold text-2xl md:text-3xl">
            <h2>Moviedb</h2>
          </div>

      
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-3xl focus:outline-none"
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

       
        <ul
          className={`nav-links flex flex-col md:flex-row items-center gap-4 md:gap-6 text-lg md:text-xl transition-transform duration-300 ${
            isMenuOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <li className="text-center">
            <a href="/" className="block py-2 md:py-0 hover:text-slate-300">
              Home
            </a>
          </li>
          <li className="text-center">
            <a
              href="/top-rated"
              className="block py-2 md:py-0 hover:text-slate-300"
            >
              Top Rated
            </a>
          </li>
          <li className="text-center">
            <a
              href="/upcoming"
              className="block py-2 md:py-0 hover:text-slate-300"
            >
              Upcoming
            </a>
          </li>
          <li className="relative text-center">
            <input
              className="w-11/12 md:w-auto mx-auto rounded-lg text-black px-4 py-1 pr-10 shadow-md focus:shadow-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all duration-300"
              placeholder="Search for a movie..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchTerm("")}
              >
                &times;
              </button>
            )}
          </li>
        </ul>
      </nav>

    
      <div className={`${isMenuOpen ? "h-32" : "h-16"}`}></div>
    </div>
  );
};

export default Navigation;
