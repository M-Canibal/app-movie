import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">MovieApp</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0 d-flex"
            style={{ justifyContent: 'center', flexGrow: 1, gap: '1rem' }}
          >
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <i className="bi bi-fire me-1"></i> Tendências
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/populares">
                <i className="bi bi-star-fill me-1"></i> Populares
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/lancamentos">
                <i className="bi bi-calendar-event me-1"></i> Lançamentos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/top">
                <i className="bi bi-trophy-fill me-1"></i> Top Avaliados
              </Link>
            </li>
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
