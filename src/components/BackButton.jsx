import { useNavigate } from 'react-router-dom';

export default function BackButton({ label = 'Voltar' }) {
  const navigate = useNavigate();
  return (
    <button className="btn btn-secondary mb-3 d-flex align-items-center" onClick={() => navigate(-1)}>
      <i className="bi bi-arrow-left me-2"></i> {label}
    </button>
  );
}