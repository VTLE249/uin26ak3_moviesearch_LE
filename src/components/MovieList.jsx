import { Link } from 'react-router-dom'
import MovieCard from './MovieCard'

export default function MovieList({ movies }) {
  return (
    <section>
      {movies.map((movie) => (
        <Link
          key={movie.imdbID}
          to={movie.Title.replace(/\s/g, '-').toLowerCase()}
        >
          <MovieCard movie={movie} />
        </Link>
      ))}
    </section>
  )
}