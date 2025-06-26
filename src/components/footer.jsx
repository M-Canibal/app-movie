import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-4">
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center">
        <p className="mb-2 mb-sm-0">
          &copy; {new Date().getFullYear()} Info Movies. Todos os direitos reservados.
        </p>
        <div>
          <a
            href="https://github.com/M-Canibal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light text-decoration-none me-3"
          >
            GitHub
          </a>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light text-decoration-none me-3"
          >
            TMDb
          </a>
          <a href="#" className="text-light text-decoration-none">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}
