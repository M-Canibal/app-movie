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
    <div className="movie-card shadow-sm" onClick={handleClick} role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}>
      <img
        src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
        alt={movie.title}
        loading="lazy"
      />
      <div className="movie-card-body">
        <h5 className="movie-card-title" title={movie.title}>{movie.title}</h5>
        <p className="movie-card-date">{formattedDate}</p>
        <span className={`movie-card-vote ${voteClass}`}>⭐ {movie.vote_average.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default MovieCard;
