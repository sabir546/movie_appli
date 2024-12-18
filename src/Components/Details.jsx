import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = "c45a857c193f6302f2b5061c3b85e743";
      const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
      const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;

      try {
        const movieResponse = await fetch(movieUrl);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const creditsResponse = await fetch(creditsUrl);
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);

        setLoading(false); 
      } catch (error) {
        console.error("Error fetching movie details or credits:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-700 text-white p-6">
        <div className="flex w-full justify-between px-4 py-6">
          <div className="w-[300px] h-[400px] bg-gray-600 animate-pulse rounded-lg"></div>

          <div className="flex-1 ml-6">
            <div className="w-1/2 h-8 bg-gray-600 animate-pulse rounded mb-4"></div>
            <div className="w-1/4 h-6 bg-gray-600 animate-pulse rounded mb-4"></div>
            <div className="w-3/4 h-6 bg-gray-600 animate-pulse rounded mb-4"></div>
            <div className="w-1/4 h-6 bg-gray-600 animate-pulse rounded mb-4"></div>
            <div className="w-full h-32 bg-gray-600 animate-pulse rounded"></div>
          </div>

          <div className="w-1/3 h-[400px] bg-gray-600 animate-pulse rounded-lg"></div>
        </div>

        <div className="credits w-full p-4 bg-gray-800">
          <div className="w-1/4 h-8 bg-gray-600 animate-pulse rounded mb-4"></div>
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-full h-32 bg-gray-600 animate-pulse rounded-lg"></div>
                <div className="w-3/4 h-4 bg-gray-600 animate-pulse rounded mt-2"></div>
                <div className="w-1/2 h-4 bg-gray-600 animate-pulse rounded mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-700 text-white flex flex-col">
      <div className="flex w-full justify-between px-4 py-6">
        <div className="flex w-2/3 items-start space-x-6">
          <div className="w-[300px] h-[400px] overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-contain"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <h5 className="text-2xl mb-4">Rating: {movie.vote_average}</h5>
            <p className="text-lg mb-4">
              Duration: {movie.runtime} mins | Genre:{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="text-lg mb-4">Release Date: {movie.release_date}</p>
            <h2 className="text-2xl font-bold mt-4">Overview</h2>
            <p className="mt-2 leading-relaxed">{movie.overview}</p>
          </div>
        </div>

        <div className="w-1/3 h-[400px] overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
          />
        </div>
      </div>

      <div className="credits w-full p-4 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="grid grid-cols-6 gap-4">
          {credits.cast.slice(0, 8).map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-80 h-100 object-cover rounded-lg"
              />
              <p className="mt-2 font-semibold">{actor.name}</p>
              <p className="text-sm">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
