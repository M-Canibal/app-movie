function SortDropdown({ sortOption, setSortOption }) {

  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="sortSelect" className="text-white fw-semibold mb-0">Ordenar:</label>
      <select
        id="sortSelect"
        className="form-select form-select-sm bg-dark text-white border-secondary"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{ minWidth: 180 }}
      >
        <option value="vote_desc">Nota: Maior para menor</option>
        <option value="vote_asc">Nota: Menor para maior</option>
        <option value="name_asc">Título: A-Z</option>
        <option value="name_desc">Título: Z-A</option>
        <option value="year_desc">Ano: Mais recente</option>
        <option value="year_asc">Ano: Mais antigo</option>
      </select>
    </div>
  );
}

export default SortDropdown;
