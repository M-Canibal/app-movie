import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import MovieCard from '../components/MovieCard';

const API_KEY = '063f1d50791f7f275acde73b162729f2';
const BASE_URL = 'https://api.themoviedb.org/3';

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
        let results = response.data.results || [];

        if (results.length === 0 && searchTerm) {
          setNoResults(true);
        }

        const sortedResults = sortMovies(results, sortOption);
        setMovies(sortedResults);
      } catch (err) {
        setError('Erro ao carregar filmes. Tente novamente.');
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
        return sorted.sort((a, b) =>
          new Date(a.release_date) - new Date(b.release_date)
        );
      case 'year_desc':
        return sorted.sort((a, b) =>
          new Date(b.release_date) - new Date(a.release_date)
        );
      default:
        return sorted;
    }
  };

  return (
    <div className="container my-4" style={{ paddingTop: '70px' }}>
      {/* Dropdown de ordenação */}
      <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
        <label className="mb-0 fw-bold" htmlFor="sortSelect">Filtro:</label>
        <select
          id="sortSelect"
          className="form-select w-auto"
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

      {/* Loader */}
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {/* Erro */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Nenhum resultado */}
      {noResults && (
        <div className="alert alert-warning">
          Nenhum filme encontrado para "{searchTerm}"
        </div>
      )}

      {/* Lista de filmes */}
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

export default Home;
