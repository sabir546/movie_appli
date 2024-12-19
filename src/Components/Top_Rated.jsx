

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Top_Rated = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8; // Number of movies per page

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "c45a857c193f6302f2b5061c3b85e743";
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-700 flex flex-col justify-center items-center pl-5">
      <div className="max-w-screen-xl w-full mt-3">
        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {currentMovies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
              <div
                className="group relative overflow-hidden rounded-md shadow-md bg-zinc-500 hover:shadow-lg transition duration-300 transform hover:scale-105 text-white"
                style={{ width: "245px", height: "370px" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-3/4 object-cover transition duration-300 transform group-hover:scale-105"
                  style={{ height: "70%" }}
                />
                <div className="p-4 text-white">
                  <h3 className="text-lg text-center font-semibold mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-white mb-1 flex items-center justify-center">
                    <span className="font-bold mr-1">Rating:</span>{" "}
                    {movie.vote_average}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6">
          <button
            className="px-4 py-2 mx-1 bg-gray-800 text-white rounded hover:bg-gray-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white"
              } rounded hover:bg-gray-600`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-1 bg-gray-800 text-white rounded hover:bg-gray-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Top_Rated;
