import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import NoResults from '../components/noResults';
import SortDropdown from '../components/SortDropdown';
import ErrorAlert from '../components/ErrorAlert';
import { useFetchMovies } from '../hooks/useFetchMovies';

function MovieListPage({ title, endpoint, searchTerm }) {
  const [sortOption, setSortOption] = useState('vote_desc');
  const { movies, loading, error, noResults } = useFetchMovies(searchTerm, sortOption, endpoint);

  return (
    <div className="container" style={{ paddingTop: '80px' }}>
      {!error && !noResults && (
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <h2 className="text-white">{title}</h2>

          {!loading && <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />}
        </div>
      )}

      {loading && <LoadingSpinner />}

      {error && <ErrorAlert message={error} />}

      {noResults && <NoResults searchTerm={searchTerm} />}

      <div className="row g-4">
        {movies.map((movie) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieListPage;
