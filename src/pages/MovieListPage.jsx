import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

function MovieListPage({ title, endpoint, fixedSort }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR`
        );
        let filmes = res.data.results;

        if (fixedSort) {
          filmes = filmes.sort((a, b) => {
            if (fixedSort.direction === 'desc') {
              return new Date(b[fixedSort.field]) - new Date(a[fixedSort.field]);
            } else {
              return new Date(a[fixedSort.field]) - new Date(b[fixedSort.field]);
            }
          });
        }

        setMovies(filmes);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [endpoint, fixedSort]);

  return (
    <div className="container" style={{ paddingTop: '70px' }}>
      <h2 className="mb-4">{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieListPage;
