import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">MovieApp</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-flex align-items-center justify-content-between"
          id="navbarNav"
        >
          <ul
            className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex"
            style={{ justifyContent: 'center', gap: '2rem', width: '100%' }}
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
            style={{ minWidth: '200px' }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
