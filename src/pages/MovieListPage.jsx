import React from 'react';
import MovieListView from '../components/MovieListView';

function MovieListPage({ title, endpoint, searchTerm }) {
  return <MovieListView title={title} endpoint={endpoint} searchTerm={searchTerm} />;
}

export default MovieListPage;
