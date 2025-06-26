import React from 'react';

export default function NoResults({ searchTerm }) {
  return (
    <div
      className="no-results text-center mt-5 vw-100"
      style={{ maxWidth: 600, backgroundColor: '#1a1a1a', boxShadow: '0 0 12px rgba(0,0,0,0.4)' }}
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
