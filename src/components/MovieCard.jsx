import React from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useNavigate } from 'react-router-dom';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';

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
    <div
      className="card h-100 shadow-sm cursor-pointer"
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      onClick={handleClick}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
        className="card-img-top"
        alt={movie.title}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">{formattedDate}</p>
        <p className={`fw-bold ${voteClass}`}>Nota: {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default MovieCard;
