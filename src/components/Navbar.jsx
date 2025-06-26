import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function NavItem({ to, iconClass, children }) {
  return (
    <li className="nav-item">
      <Link className="nav-link d-flex align-items-center" to={to}>
        <i className={`${iconClass} me-1`}></i> {children}
      </Link>
    </li>
  );
}

function Navbar({ onSearch }) {
  const bsCollapseRef = useRef(null);

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    const bsCollapse = document.getElementById('navbarNav');
    bsCollapseRef.current = bsCollapse;

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.getComputedStyle(bsCollapse).display !== 'none') {
          const bsCollapseObj = window.bootstrap?.Collapse.getInstance(bsCollapse);
          if (bsCollapseObj) bsCollapseObj.hide();
        }
      });
    });

    return () => {
      navLinks.forEach(link => {
        link.replaceWith(link.cloneNode(true));
      });
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm fw-semibold">
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center flex-grow-1 gap-3">
            <NavItem to="/" iconClass="bi bi-fire">Tendências</NavItem>
            <NavItem to="/populares" iconClass="bi bi-star-fill">Populares</NavItem>
            <NavItem to="/lancamentos" iconClass="bi bi-calendar-event">Lançamentos</NavItem>
            <NavItem to="/top" iconClass="bi bi-trophy-fill">Top Avaliados</NavItem>
          </ul>

          <input
            type="search"
            className="form-control ms-3 teste"
            style={{ maxWidth: '250px', alignSelf: 'center' }}
            placeholder="Buscar filmes..."
            onChange={handleSearch}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
