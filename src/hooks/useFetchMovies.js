import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Função de ordenação
export function sortMovies(moviesList, option) {
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
}

export function useFetchMovies(searchTerm = '', sortOption = 'vote_desc', endpoint = '') {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError('');
      setNoResults(false);

      try {
        let url = '';

        if (searchTerm && searchTerm.trim() !== '') {
          url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(searchTerm)}`;
        } else if (endpoint) {
          url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR`;
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

        // Aplicar ordenação aqui:
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
  }, [searchTerm, sortOption, endpoint]);

  return { movies, loading, error, noResults };
}
