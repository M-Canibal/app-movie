import React from 'react';
import MovieListView from '../components/MovieListView';

function Home({ searchTerm }) {
  return <MovieListView searchTerm={searchTerm} />;
}

export default Home;
