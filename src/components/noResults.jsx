import React from 'react';

export default function NoResults({ searchTerm }) {
  return (
    <div
      className="no-results text-center m-5 p-5 rounded-3 vw-100 bg-dark"
    >
      <i className="bi bi-emoji-frown fs-1 text-primary mb-3 d-block text-warning"></i>
      <h2 className="fs-3 mb-2 text-white">Nenhum filme encontrado</h2>
      <p className="fs-6 text-secondary">
        Não encontramos resultados para <strong>"{searchTerm}"</strong>.
        <br />
        Tente outro título ou palavra-chave.
      </p>
    </div>
  );
}
