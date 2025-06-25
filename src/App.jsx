import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MovieListPage from './pages/MovieListPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/populares" element={<MovieListPage title="Populares" endpoint="/movie/popular" />} />

        <Route
          path="/lancamentos"
          element={
            <MovieListPage
              title="Lançamentos"
              endpoint="/movie/now_playing"
              fixedSort={{ field: 'release_date', direction: 'desc' }}
            />
          }
        />

        <Route path="/top" element={<MovieListPage title="Top Avaliados" endpoint="/movie/top_rated" />} />
      </Routes>
    </>
  );
}

export default App;
