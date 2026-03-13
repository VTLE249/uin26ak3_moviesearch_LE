export default function MovieCard({ movie }) {
  const fallback = '/src/assets/fallback.png'

  return (
    <article>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : fallback}
        alt={movie.Title}
        width="200"
      />
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
    </article>
  )
}