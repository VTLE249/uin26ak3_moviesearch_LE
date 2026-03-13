import { useParams } from 'react-router-dom'

export default function Movie({ movies }) {
  const { movie } = useParams()

  const selected = movies?.find(
    m => m.Title.replace(/\s/g, '-').toLowerCase() === movie
  )

  if (!selected) return <p>Filmen ble ikke funnet.</p>

  return (
    <main>
      <h1>{selected.Title}</h1>
      <img src={selected.Poster !== "N/A" ? selected.Poster : '/src/assets/fallback.png'} alt={selected.Title} />
      <p>Utgivelsesår: {selected.Year}</p>
      <p>Type: {selected.Type}</p>
    </main>
  )
}