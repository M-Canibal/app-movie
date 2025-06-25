import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;
const PROFILE_IMAGE = 'https://image.tmdb.org/t/p/w185';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
        setMovie(response.data);

        const creditsRes = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`);
        setCast(creditsRes.data.cast.slice(0, 6));

        const videosRes = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`);
        const trailer = videosRes.data.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        setError('Erro ao carregar detalhes do filme.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!movie) return null;

  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), "dd 'de' MMM 'de' yyyy", { locale: ptBR })
    : 'Data desconhecida';

  const voteClass = movie.vote_average > 6 ? 'text-success' : 'text-danger';

  return (
    <div className="container my-4" style={{ paddingTop: '80px' }}>
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-2"></i> Voltar
      </button>

      <div className="row g-4 align-items-start">
        {/* Poster */}
        <div className="col-md-4 col-lg-3">
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem'}
            alt={movie.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '420px', objectFit: 'cover' }}
          />
        </div>

        {/* Informações */}
        <div className="col-md-8 col-lg-9">
          <h2 className="fw-bold mb-2">{movie.title}</h2>
          <p className="mb-1"><strong>Data de lançamento:</strong> {formattedDate}</p>
          <p className="mb-1"><strong>Nota:</strong> <span className={`fw-semibold ${voteClass}`}>{movie.vote_average.toFixed(1)}</span></p>
          <p className="mb-1"><strong>Duração:</strong> {movie.runtime ? `${movie.runtime} min` : 'Indisponível'}</p>
          <p className="mb-1"><strong>Gêneros:</strong> {movie.genres?.map(g => g.name).join(', ') || 'Indisponível'}</p>
          <p className="mt-3"><strong>Sinopse:</strong></p>
          <p className="mb-1">{movie.overview || 'Sem sinopse disponível.'}</p>
        </div>
      </div>

      {/* Trailer (acima do elenco) */}
      {trailerKey && (
        <div className="mt-5">
          <h4 className="mb-3">Trailer oficial</h4>
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Elenco */}
      <div className="mt-5">
        <h4 className="mb-3">Elenco principal</h4>
        {cast.length > 0 ? (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
            {cast.map(actor => (
              <div key={actor.cast_id} className="col text-center">
                <img
                  src={actor.profile_path ? `${PROFILE_IMAGE}${actor.profile_path}` : 'https://via.placeholder.com/150x225?text=Sem+Foto'}
                  alt={actor.name}
                  className="img-fluid rounded shadow-sm mb-2"
                  style={{ height: '160px', objectFit: 'cover', width: '100%' }}
                />
                <div className="fw-medium small">{actor.name}</div>
                <small className="text-muted">{actor.character}</small>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Elenco indisponível.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
