import { useEffect, useState } from 'react'
import History from '../components/History'
import MovieList from '../components/MovieList'

export default function Home({ movies, setMovies }) {
  const [search, setSearch] = useState('')
  const [focused, setFocused] = useState(false)
  const storedHistory = localStorage.getItem('search')
  const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

  const apiKey = import.meta.env.VITE_APP_API_KEY
  const baseUrl = 'http://www.omdbapi.com/'

  // Lagre history til localStorage
  useEffect(() => {
    localStorage.setItem('search', JSON.stringify(history))
  }, [history])

  // Ca. 10 kjente James Bond-filmer
  const bondTitles = [
    "Skyfall", "From Russia with Love", "Goldfinger", "Thunderball",
    "Spectre", "No Time To Die",
    "Diamonds Are Forever", "Live and Let Die",
    "The Man with the Golden Gun", "The Spy Who Loved Me", 
  ]

  // Hent James Bond-filmer
  useEffect(() => {
    const fetchBondMovies = async () => {
      const results = []
      for (let title of bondTitles) {
        const res = await fetch(`${baseUrl}?t=${encodeURIComponent(title)}&apikey=${apiKey}`)
        const data = await res.json()
        if (data && data.Type === 'movie') results.push(data)
      }
      setMovies(results)
    }

    if (movies.length === 0) fetchBondMovies()
  }, [])

  // Hent filmer fra søk
  const fetchMovies = async (query) => {
    try {
      const res = await fetch(`${baseUrl}?s=${encodeURIComponent(query)}&apikey=${apiKey}`)
      const data = await res.json()
      if (data.Search) {
        const filtered = data.Search.filter(m => m.Type === 'movie')
        setMovies(filtered)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.length < 3) return alert('Skriv minst 3 tegn')
    fetchMovies(search)
    setHistory(prev => [...prev, search])
    e.target.reset()
  }

  return (
    <main>
      <h1>Forside</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Søk etter film
          <input
            type="search"
            placeholder="Skriv tittel"
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
          />
        </label>

        {focused && <History history={history} setSearch={setSearch} />}

        <button type="submit">Søk</button>
      </form>

      <MovieList movies={movies} />
    </main>
  )
}