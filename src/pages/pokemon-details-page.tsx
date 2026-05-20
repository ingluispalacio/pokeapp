import { useNavigate, useParams } from 'react-router-dom'

import { PokemonAbilityCard } from '@/components/pokemon/pokemon-ability-card'

import { PokemonTypeBadge } from '@/components/ui/pokemon-type-badge'

import { usePokemonDetail } from '@/hooks/use-pokemon-detail'

export function PokemonDetailsPage() {
  const navigate = useNavigate()

  const { name } = useParams()

  const { data, isLoading, isError } =
    usePokemonDetail(name ?? '')

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        Loading Pokémon...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl bg-red-50 p-8 text-red-600">
        Pokémon not found.
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          shadow-sm
          transition
          hover:bg-gray-50
          cursor-pointer
        "
      >
        ← Back
      </button>

      <div
        className="
          grid
          gap-8
          rounded-3xl
          bg-white
          p-6
          shadow-sm
          lg:grid-cols-2
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
            rounded-3xl
            bg-slate-50
            p-8
          "
        >
          <img
            src={
              data.sprites.other['official-artwork']
                .front_default
            }
            alt={data.name}
            className="h-72 w-72 object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-400">
              #{String(data.id).padStart(3, '0')}
            </p>

            <h1 className="text-5xl font-bold capitalize text-gray-800">
              {data.name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.types.map((type) => (
              <PokemonTypeBadge
                key={type.type.name}
                type={type.type.name}
              />
            ))}
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">
              Weight
            </p>

            <p className="text-2xl font-bold text-gray-800">
              {data.weight}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Abilities
            </h2>

            <div className="space-y-3">
              {data.abilities.map((ability) => (
                <PokemonAbilityCard
                  key={ability.ability.name}
                  name={ability.ability.name}
                  url={ability.ability.url}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}