import type { Pokemon } from '@/types/pokemon'
import { PokemonTypeBadge } from '../ui/pokemon-type-badge'
import { useNavigate } from 'react-router-dom'
import { isTouchDevice } from '@/utils/is-touch-device'

interface Props {
  pokemons: Pokemon[]
}

export function PokemonTable({ pokemons }: Props) {
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-(--color-primary) text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider w-24"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider w-32"
              >
                Foto
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
              >
                Tipos
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {pokemons.map((pokemon) => (
              <tr
                key={pokemon.id}
                className="group transition-colors duration-200 hover:bg-slate-50/70"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-400">
                  #{String(pokemon.id).padStart(3, '0')}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-1 transition-transform duration-300 group-hover:scale-105">
                    <img
                      onClick={() => {
                        if (isTouchDevice()) {
                          navigate(`/pokemon/${pokemon.name}`)
                        }
                      }}
                      onDoubleClick={() => {
                        if (!isTouchDevice()) {
                          navigate(`/pokemon/${pokemon.name}`)
                        }
                      }}
                      loading="lazy"
                      src={
                        pokemon.sprites.other['official-artwork']
                          .front_default ?? ''
                      }
                      alt={pokemon.name}
                      className="h-full w-full object-contain cursor-pointer"
                    />
                  </div>
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-semibold text-gray-800 capitalize tracking-wide">
                    {pokemon.name}
                  </div>
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex gap-1.5">
                    {pokemon.types?.map((t) => (
                      <PokemonTypeBadge key={t.type.name} type={t.type.name} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
