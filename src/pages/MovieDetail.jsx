import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 600);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth > 600);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!movie) return null;

  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), "dd 'de' MMM 'de' yyyy", { locale: ptBR })
    : 'Data desconhecida';

  const voteClass = movie.vote_average > 6 ? 'text-success' : 'text-danger';

  return (
    <div className="container bg-dark bg-opacity-75 rounded-4 shadow-lg pt-4">
      <BackButton />

      <div className="row gy-4 align-items-start">
        <div className="col-12 col-lg-4 text-center">
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE}${movie.poster_path}`
                : 'https://via.placeholder.com/350x525?text=Sem+Imagem'
            }
            alt={movie.title}
            className="img-fluid rounded shadow mb-4"
            style={{ maxHeight: '525px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-12 col-lg-8">
          <h2 className="fs-3 fw-bold text-center text-lg-start mb-4">{movie.title}</h2>

          <div className="mb-3 d-flex align-items-center gap-3 flex-wrap">
            <div>
              <i className="bi bi-calendar-event-fill me-2 text-info fs-5"></i>
              <strong>Data de lançamento:</strong> {formattedDate}
            </div>

            <div>
              <i className="bi bi-star-fill me-2 text-warning fs-5"></i>
              <strong>Nota:</strong>{' '}
              <span className={`fw-bold ${voteClass}`}>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          <div className="mb-4">
            <i className="bi bi-chat-left-text-fill me-2 text-info fs-5"></i>
            <strong>Sinopse:</strong>
            <p className="mt-2 text-white-50" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              {movie.overview || 'Sem sinopse disponível.'}
            </p>
          </div>

          <div className="mb-3 d-flex align-items-center gap-3 flex-wrap">
            <div>
              <i className="bi bi-clock-fill me-2 text-primary fs-5"></i>
              <strong>Duração:</strong> {movie.runtime ? `${movie.runtime} minutos` : 'Indisponível'}
            </div>

            <div>
              <i className="bi bi-tags-fill me-2 text-secondary fs-5"></i>
              <strong>Gêneros:</strong> {movie.genres?.map(g => g.name).join(', ') || 'Indisponível'}
            </div>
          </div>

          {trailerKey && (
            <>
              <h5 className="mb-3 mt-4">
                <i className="bi bi-camera-reels-fill me-2 text-danger fs-5"></i>
                Trailer
              </h5>
              {isLargeScreen ? (
                <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Trailer"
                    allowFullScreen
                    className="border-0"
                  ></iframe>
                </div>
              ) : (
                <div className="d-flex justify-content-center my-3">
                  <a
                    href={`https://www.youtube.com/watch?v=${trailerKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-danger"
                  >
                    Assistir Trailer no YouTube
                  </a>
                </div>
              )}
            </>
          )}

          <div className="mt-5">
            <h4 className="mb-4 text-start">
              <i className="bi bi-people-fill me-2 text-warning fs-5"></i>
              Elenco principal
            </h4>
            <CastGrid cast={cast.slice(0, 6)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
