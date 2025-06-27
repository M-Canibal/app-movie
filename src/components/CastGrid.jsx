const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE;

export default function CastGrid({ cast }) {
  return (
    <div className="row row-cols-2 row-cols-sm-3 g-4 justify-content-center">
      {cast.length > 0 ? (
        cast.map(actor => (
          <div key={actor.cast_id} className="col text-center">
            <img
              src={actor.profile_path ? `${IMAGE_BASE}${actor.profile_path}` : 'https://via.placeholder.com/100x140?text=Sem+Foto'}
              alt={actor.name}
              className="img-fluid rounded shadow-sm mb-2 cast-img"
              style={{ maxHeight: '140px', objectFit: 'cover', cursor: 'pointer' }}
              title={`${actor.name} como ${actor.character}`}
            />
            <small
              className="d-block text-truncate text-light fw-semibold"
              title={actor.name}
              style={{ maxWidth: '120px', margin: '0 auto' }}
            >
              {actor.name}
            </small>
            <small
              className="d-block text-muted"
              style={{ fontSize: '0.85rem', maxWidth: '120px', margin: '0 auto' }}
              title={actor.character}
            >
              como {actor.character}
            </small>
          </div>
        ))
      ) : (
        <p className="text-center">Elenco indisponível.</p>
      )}
    </div>
  );
}
