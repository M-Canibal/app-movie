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

  const voteClass = movie.vote_average > 6 ? 'text-success' : 'text-danger';

  return (
    <div className="movie-card d-flex rounded overflow-hidden bg-dark d-flex flex-column" onClick={handleClick} role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}>
      <img

        src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
        alt={movie.title}
        loading="lazy"
      />
      <div className="justify-content-between d-flex flex-column py-3 px-3">
        <h2 className="fs-6 fw-bold text-light mb-1" title={movie.title}>{movie.title}</h2>
        <p className="fs-6 fw-light text-secondary mb-2">{formattedDate}</p>
        <span
          className={`align-self-start px-2 py-1 rounded-pill fw-bold fs-6 text-white ${voteClass === 'text-success' ? 'bg-success' : 'bg-danger'}`}
        >
          <i className="bi bi-star-fill me-1 text-warning"></i>
          {movie.vote_average.toFixed(1)}
        </span>

      </div>
    </div>
  );
}

export default MovieCard;
