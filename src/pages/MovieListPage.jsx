import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const API_KEY = '063f1d50791f7f275acde73b162729f2';
const BASE_URL = 'https://api.themoviedb.org/3';

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
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieListPage;
