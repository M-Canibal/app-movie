export function sortMovies(moviesList, option) {
  const sorted = [...moviesList];
  switch (option) {
    case 'vote_asc':
      return sorted.sort((a, b) => a.vote_average - b.vote_average);
    case 'vote_desc':
      return sorted.sort((a, b) => b.vote_average - a.vote_average);
    case 'name_asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name_desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'year_asc':
      return sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    case 'year_desc':
      return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    default:
      return sorted;
  }
}
