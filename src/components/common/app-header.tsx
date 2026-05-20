import { useNavigate } from "react-router-dom"

export function AppHeader() {
   const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200 shadow-xs">
            <img src="/src/assets/pokeball.png" alt="Pokeball" className="w-full cursor-pointer" onClick={() => navigate('/')} />
          </div>
          <span className="text-sm font-semibold tracking-wide text-gray-800 uppercase">
            PokéApp
          </span>
        </div>
      </div>
    </header>
  )
}