import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import NoResults from '../components/noResults';
import LoadingSpinner from '../components/LoadingSpinner';
import SortDropdown from '../components/SortDropdown';
import ErrorAlert from '../components/ErrorAlert';
import { useFetchMovies } from '../hooks/useFetchMovies';

function Home({ searchTerm }) {
  const [sortOption, setSortOption] = useState('vote_desc');
  const { movies, loading, error, noResults } = useFetchMovies(searchTerm, sortOption);

  return (
    <div className="container" style={{ paddingTop: '80px' }}>
      {!error && !noResults && (
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <h2 className="text-white">Filmes em alta</h2>

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

export default Home;
