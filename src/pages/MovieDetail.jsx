import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import useMovieDetails from '../hooks/useMovieDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import BackButton from '../components/BackButton';
import ErrorAlert from '../components/ErrorAlert';
import CastGrid from '../components/CastGrid';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, cast, trailerKey, loading, error } = useMovieDetails(id);

  const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

  if (loading) return <LoadingSpinner />;

  if (error) return <ErrorAlert message={error} />;

  if (!movie) return null;

  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), "dd 'de' MMM 'de' yyyy", { locale: ptBR })
    : 'Data desconhecida';

  const voteClass = movie.vote_average > 6 ? 'text-success' : 'text-danger';

  return (
    <div className="container my-4 text-light" style={{ paddingTop: '70px' }}>
      <BackButton />

      <div className="row g-4">
        <div className="col-md-4 d-flex flex-column align-items-center">
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/350x525?text=Sem+Imagem'}
            alt={movie.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '525px', width: 'auto' }}
          />
          <h4 className="mt-4 mb-3">Elenco principal</h4>
          <CastGrid cast={cast} />
        </div>

        <div className="col-md-8 d-flex flex-column justify-content-start">
          <h2 className="mb-2">{movie.title}</h2>
          <p><strong>Data de lançamento:</strong> {formattedDate}</p>
          <p><strong>Nota:</strong> <span className={`${voteClass} fw-bold fs-5`}>{movie.vote_average.toFixed(1)}</span></p>
          <p className="lh-base text-light"><strong>Sinopse:</strong><br />{movie.overview || 'Sem sinopse disponível.'}</p>
          <p><strong>Duração:</strong> {movie.runtime ? `${movie.runtime} minutos` : 'Indisponível'}</p>
          <p><strong>Gêneros:</strong> {movie.genres?.map(g => g.name).join(', ') || 'Indisponível'}</p>

          {trailerKey && (
            <div className="ratio ratio-16x9 mt-3 mb-4 shadow-sm rounded overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
                className="w-100 h-100 border-0"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
