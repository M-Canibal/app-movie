import React from 'react';

const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

export default function CastGrid({ cast }) {
  return (
    <div className="d-grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {cast.length > 0 ? (
        cast.map(actor => (
          <div key={actor.cast_id} className="text-center" style={{ maxWidth: '120px' }}>
            <img
              src={actor.profile_path ? `${IMAGE_BASE}${actor.profile_path}` : 'https://via.placeholder.com/100x140?text=Sem+Foto'}
              alt={actor.name}
              className="img-fluid rounded shadow-sm mb-1"
              style={{ maxHeight: '140px', transition: 'transform 0.3s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <small className="d-block text-truncate text-light fw-semibold" title={actor.name}>{actor.name}</small>
            <small className="d-block text-muted" style={{ fontSize: '0.85rem' }} title={actor.character}>
              como {actor.character}
            </small>
          </div>
        ))
      ) : (
        <p>Elenco indisponível.</p>
      )}
    </div>
  );
}
