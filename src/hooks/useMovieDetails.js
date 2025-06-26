import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const movieRes = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
        setMovie(movieRes.data);

        const creditsRes = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`);
        setCast(creditsRes.data.cast.slice(0, 6));

        const videosRes = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`);
        const trailer = videosRes.data.results.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        setError('Erro ao carregar detalhes do filme.');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  return { movie, cast, trailerKey, loading, error };
}
