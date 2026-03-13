import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'

export default function App() {
  const [movies, setMovies] = useState([])  

  return (
    <Routes>
      <Route index element={<Home movies={movies} setMovies={setMovies} />} />
      <Route path=":movie" element={<Movie movies={movies} />} />
    </Routes>
  )
}