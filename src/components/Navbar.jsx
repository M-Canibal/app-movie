import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/"> MovieApp</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Tendências</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/populares">Populares</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/lancamentos">Lançamentos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/top">Top Avaliados</Link></li>
          </ul>
          <input
            type="search"
            className="form-control w-auto"
            placeholder="Buscar filmes..."
            onChange={handleSearch}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
