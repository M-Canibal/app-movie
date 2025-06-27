import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import NoResults from '../components/noResults';
import SortDropdown from '../components/SortDropdown';
import ErrorAlert from '../components/ErrorAlert';
import { useFetchMovies } from '../hooks/useFetchMovies';

// Mapeia os títulos para ícones Bootstrap ou emojis
const titleIcons = {
  'Filmes em alta': 'bi-fire',
  'Populares': 'bi-hand-thumbs-up',
  'Lançamentos': 'bi-calendar-event',
  'Top Avaliados': 'bi-star-fill',
};

function MovieListView({ title = 'Filmes em alta', endpoint = '/trending/movie/day', searchTerm }) {
  const [sortOption, setSortOption] = useState('vote_desc');
  const { movies, loading, error, noResults } = useFetchMovies(searchTerm, sortOption, endpoint);

  // Pega o ícone correspondente ao título ou usa um padrão
  const iconClass = titleIcons[title] || 'bi-film';

  return (
    <div className="container py-5">
      {!error && !noResults && (
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-4 mb-4 border-bottom pb-2">
          <h2 className="text-white fw-bold mb-2 d-flex align-items-center gap-2">
            <i className={`bi ${iconClass} text-warning`}></i> {title}
          </h2>

          {!loading && (
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
          )}
        </div>
      )}

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}
      {noResults && <NoResults searchTerm={searchTerm} />}

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-5 g-4">
        {movies.map((movie) => (
          <div className="col" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieListView;
