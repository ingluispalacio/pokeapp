import type { Pokemon } from '@/types/pokemon'
import { useNavigate } from 'react-router-dom'

interface Props {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate()
  return (
    <article
      className="
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-4
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-2xl
            bg-slate-50
          "
        >
          <img
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            loading="lazy"
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="h-20 w-20 object-contain cursor-pointer"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <p className="text-xs text-gray-400">
              #{String(pokemon.id).padStart(3, '0')}
            </p>

            <h2 className="text-lg font-bold capitalize text-gray-800">
              {pokemon.name}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="
                  rounded-full
                  bg-slate-100
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  uppercase
                  text-slate-600
                "
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
