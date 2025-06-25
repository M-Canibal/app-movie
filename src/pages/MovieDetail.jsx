import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const API_KEY = '063f1d50791f7f275acde73b162729f2';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
        setMovie(response.data);
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
    <div className="container my-4" style={{ paddingTop: '70px' }}>
      <button className="btn btn-secondary mb-3 d-flex align-items-center" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-2"></i> Voltar
      </button>

      <div className="row">
        <div className="col-md-5">
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem'}
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-7">
          <h2>{movie.title}</h2>
          <p><strong>Data de lançamento:</strong> {formattedDate}</p>
          <p><strong>Nota:</strong> <span className={voteClass}>{movie.vote_average.toFixed(1)}</span></p>
          <p><strong>Sinopse:</strong> {movie.overview || 'Sem sinopse disponível.'}</p>
          <p><strong>Duração:</strong> {movie.runtime ? `${movie.runtime} minutos` : 'Indisponível'}</p>
          <p><strong>Gêneros:</strong> {movie.genres?.map(g => g.name).join(', ') || 'Indisponível'}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;