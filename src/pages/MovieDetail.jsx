import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

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
        setCast(creditsRes.data.cast.slice(0, 6)); // 6 atores para 2 linhas x 3 colunas

        const videosRes = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`);
        const trailer = videosRes.data.results.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        setError('Erro ao carregar detalhes do filme.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status" aria-label="Carregando">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container my-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  if (!movie) return null;

  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), "dd 'de' MMM 'de' yyyy", { locale: ptBR })
    : 'Data desconhecida';

  const voteClass = movie.vote_average > 6 ? 'text-success' : 'text-danger';

  return (
    <div className="container my-4" style={{ paddingTop: '70px', color: '#eee' }}>
      <button className="btn btn-secondary mb-3 d-flex align-items-center" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-2"></i> Voltar
      </button>

      <div className="row g-4">
        <div className="col-md-4 d-flex flex-column align-items-center">
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/350x525?text=Sem+Imagem'}
            alt={movie.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '525px', width: 'auto' }}
          />

          {/* Título elenco */}
          <h4 className="elenco-title">Elenco principal</h4>

          {/* Elenco em grid */}
          <div className="elenco-grid">
            {cast.length > 0 ? (
              cast.map(actor => (
                <div key={actor.cast_id} className="elenco-card">
                  <img
                    src={actor.profile_path ? `${IMAGE_BASE}${actor.profile_path}` : 'https://via.placeholder.com/100x140?text=Sem+Foto'}
                    alt={actor.name}
                    className="img-fluid rounded shadow-sm"
                  />
                  <small title={actor.name}>{actor.name}</small>
                  <small className="character" title={actor.character}>como {actor.character}</small>
                </div>
              ))
            ) : (
              <p>Elenco indisponível.</p>
            )}
          </div>
        </div>

        <div className="col-md-8 d-flex flex-column justify-content-start">
          <h2 className="mb-2">{movie.title}</h2>
          <p><strong>Data de lançamento:</strong> {formattedDate}</p>
          <p>
            <strong>Nota:</strong>{' '}
            <span className={voteClass} style={{ fontWeight: '700', fontSize: '1.2rem' }}>
              {movie.vote_average.toFixed(1)}
            </span>
          </p>

          <p className="movie-synopsis">
            <strong>Sinopse:</strong><br />
            {movie.overview || 'Sem sinopse disponível.'}
          </p>

          <p><strong>Duração:</strong> {movie.runtime ? `${movie.runtime} minutos` : 'Indisponível'}</p>
          <p><strong>Gêneros:</strong> {movie.genres?.map(g => g.name).join(', ') || 'Indisponível'}</p>

          {trailerKey && (
            <div className="ratio ratio-16x9 mt-3 mb-4 shadow-sm rounded">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
                style={{ borderRadius: '8px' }}
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
