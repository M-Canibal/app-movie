import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Home({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [sortOption, setSortOption] = useState('vote_desc');

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError('');
      setNoResults(false);

      try {
        let url = '';
        if (searchTerm && searchTerm.trim() !== '') {
          url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(searchTerm)}`;
        } else {
          url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=pt-BR`;
        }

        const response = await axios.get(url);

        if (response.status !== 200) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const results = response.data.results || [];

        if (results.length === 0 && searchTerm) {
          setNoResults(true);
        }

        const sortedResults = sortMovies(results, sortOption);
        setMovies(sortedResults);
      } catch (err) {
        console.error('Erro ao carregar filmes:', err);
        if (err.response) {
          if (err.response.status === 401) {
            setError('Erro de autenticação. Verifique sua API key.');
          } else if (err.response.status === 404) {
            setError('Recurso não encontrado.');
          } else {
            setError(`Erro do servidor: ${err.response.statusText}`);
          }
        } else if (err.request) {
          setError('Falha na comunicação com o servidor. Verifique sua conexão.');
        } else {
          setError('Erro inesperado ao carregar filmes.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchTerm, sortOption]);

  const sortMovies = (moviesList, option) => {
    const sorted = [...moviesList];
    switch (option) {
      case 'vote_asc':
        return sorted.sort((a, b) => a.vote_average - b.vote_average);
      case 'vote_desc':
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      case 'name_asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'name_desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'year_asc':
        return sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      case 'year_desc':
        return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      default:
        return sorted;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '80px' }}>
      {!error && !noResults && (
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <h2 className="home-title">Filmes em alta</h2>

          {!loading && (
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="sortSelect" className="text-white fw-semibold mb-0">Ordenar:</label>
              <select
                id="sortSelect"
                className="form-select form-select-sm bg-dark text-white border-secondary"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="vote_desc">Nota: Maior para menor</option>
                <option value="vote_asc">Nota: Menor para maior</option>
                <option value="name_asc">Título: A-Z</option>
                <option value="name_desc">Título: Z-A</option>
                <option value="year_desc">Ano: Mais recente</option>
                <option value="year_asc">Ano: Mais antigo</option>
              </select>
            </div>
          )}
        </div>
      )}

      {loading && <LoadingSpinner />}

      {error && (
        <div className="alert alert-danger text-center mt-5">
          {error}
        </div>
      )}

      {noResults && (
        <div className="no-results text-center mt-5">
          <i className="bi bi-emoji-frown no-results-icon fs-1 text-warning"></i>
          <h2 className="text-light mt-3">Nenhum filme encontrado</h2>
          <p className="text-secondary">
            Não encontramos resultados para <strong>"{searchTerm}"</strong>.
            <br />
            Tente outro título ou palavra-chave.
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

export default Home;
