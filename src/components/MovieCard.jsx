import React from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), "dd 'de' MMM 'de' yyyy", { locale: ptBR })
    : 'Data desconhecida';

  const voteClass = movie.vote_average > 6 ? 'bg-success' : 'bg-danger';

  return (
    <div
      className="bg-glass d-flex flex-column rounded overflow-hidden shadow-sm"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
      style={{ height: '100%' }}
    >
      <img
        src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
        alt={movie.title}
        loading="lazy"
        className="img-fluid"
        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
      />
      <div className="d-flex flex-column justify-content-between p-3 flex-grow-1">
        <h2 className="fs-6 fw-bold text-light mb-1 text-truncate" title={movie.title}>
          {movie.title}
        </h2>
        <p className="fs-6 fw-light text-secondary mb-2">{formattedDate}</p>
        <span className={`align-self-start px-2 py-1 rounded-pill fw-bold fs-6 text-white ${voteClass}`}>
          <i className="bi bi-star-fill me-1 text-warning"></i>
          {movie.vote_average.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
