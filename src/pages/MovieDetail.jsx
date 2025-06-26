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
    <div className="container pt-5 pb-4 text-light mt-4">
      <BackButton />

      <div className="row gy-4 align-items-start">
        {/* Poster */}
        <div className="col-12 col-lg-4 text-center">
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/350x525?text=Sem+Imagem'}
            alt={movie.title}
            className="img-fluid rounded shadow mb-3"
            style={{ maxHeight: '525px', objectFit: 'cover' }}
          />
        </div>

        {/* Infos do filme */}
        <div className="col-12 col-lg-8">
          <h2 className="fs-3 fw-bold text-center text-lg-start">{movie.title}</h2>
          <p className="mb-1"><strong>Data de lançamento:</strong> {formattedDate}</p>
          <p className="mb-1">
            <strong>Nota:</strong>{' '}
            <span className={`fw-bold ${voteClass}`}>
              {movie.vote_average.toFixed(1)}
            </span>
          </p>
          <p className="mb-2">
            <strong>Sinopse:</strong><br />
            {movie.overview || 'Sem sinopse disponível.'}
          </p>
          <p className="mb-1"><strong>Duração:</strong> {movie.runtime ? `${movie.runtime} minutos` : 'Indisponível'}</p>
          <p className="mb-3"><strong>Gêneros:</strong> {movie.genres?.map(g => g.name).join(', ') || 'Indisponível'}</p>

          {trailerKey && (
            <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
                className="border-0"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Elenco */}
      <div className="mt-5">
        <h4 className="mb-3 text-center">Elenco principal</h4>
        <CastGrid cast={cast.slice(0, 6)} /> {/* Máximo 6 atores */}
      </div>
    </div>
  );
}

export default MovieDetail;
