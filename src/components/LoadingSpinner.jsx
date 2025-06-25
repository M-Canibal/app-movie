function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status" aria-label="Carregando">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
