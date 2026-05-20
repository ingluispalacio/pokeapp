import { PokemonCard } from './pokemon-card'
import { PokemonTable } from './pokemon-table'

import type { Pokemon } from '@/types/pokemon'

interface Props {
  pokemons: Pokemon[]
}

export function PokemonList({ pokemons }: Props) {
  return (
    <div className="space-y-6">
      {/* Mobile: Se muestra por defecto, se oculta en md (tablets/desktop) */}
      <div className="grid gap-4 md:hidden">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
          />
        ))}
      </div>

      {/* Tablet/Desktop: Oculto por defecto, se muestra como bloque a partir de md */}
      <div className="hidden md:block">
        <PokemonTable pokemons={pokemons} />
      </div>
    </div>
  )
}