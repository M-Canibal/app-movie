import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MovieListPage from './pages/MovieListPage';
import Footer from './components/footer';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/populares" element={<MovieListPage title="Populares" endpoint="/movie/popular" searchTerm={searchTerm} />} />
          <Route path="/lancamentos" element={<MovieListPage title="Lançamentos" endpoint="/movie/now_playing" fixedSort={{ field: 'release_date', direction: 'desc' }} searchTerm={searchTerm} />} />
          <Route path="/top" element={<MovieListPage title="Top Avaliados" endpoint="/movie/top_rated" searchTerm={searchTerm} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
