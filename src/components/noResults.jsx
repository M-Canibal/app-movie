import React from 'react';

export default function NoResults({ searchTerm }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="no-results text-center p-5 rounded-3 bg-dark">
        <i className="bi bi-emoji-frown fs-1 text-warning mb-3 d-block"></i>
        <h2 className="fs-3 mb-2 text-white">Nenhum filme encontrado</h2>
        <p className="fs-6 text-secondary">
          Não encontramos resultados para <strong>"{searchTerm}"</strong>.
          <br />
          Tente outro título ou palavra-chave.
        </p>
      </div>
    </div>
  );
}
