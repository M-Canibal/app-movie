import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

function MovieListPage({ title, endpoint, searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError('');
      setNoResults(false);

      try {
        let finalUrl = '';

        if (searchTerm && searchTerm.trim() !== '') {
          finalUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(searchTerm)}`;
        } else {
          finalUrl = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR`;
        }

        const response = await axios.get(finalUrl);
        const results = response.data.results || [];

        if (results.length === 0 && searchTerm) {
          setNoResults(true);
        }

        setMovies(results);
      } catch (err) {
        setError('Erro ao carregar os filmes. Tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [endpoint, searchTerm]);

  return (
    <div className="container" style={{ paddingTop: '80px' }}>
      {!loading && !noResults && !error && (
        <h2 className="home-title mb-4">{title}</h2>
      )}

      {loading && <LoadingSpinner />}

      {error && <div className="alert alert-danger">{error}</div>}

      {noResults && (
        <div className="no-results text-center mt-5">
          <i className="bi bi-emoji-frown no-results-icon fs-1 text-warning"></i>
          <h2 className="text-light mt-3">Nenhum filme encontrado</h2>
          <p className="text-secondary">
            Não encontramos resultados para <strong>"{searchTerm}"</strong>. Tente outro título ou palavra-chave.
          </p>
        </div>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieListPage;
