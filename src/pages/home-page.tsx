import { useMemo, useState } from 'react'

import { PageSizeSelect } from '@/components/common/page-size-select'
import { Pagination } from '@/components/common/pagination'

import { PokemonList } from '@/components/pokemon/pokemon-list'
import { PokemonSearch } from '@/components/pokemon/pokemon-search'

import { usePokemons } from '@/hooks/use-pokemons'

import { useAllPokemons } from '@/hooks/use-all-pokemons'

import { useDebounce } from '@/hooks/use-debounce'

export function HomePage() {
  const [page, setPage] = useState(1)

  const [limit, setLimit] = useState(10)

  const [search, setSearch] = useState('')

  const debouncedSearch =
  useDebounce(search, 400)

  const { data, isLoading, isError } = usePokemons(page, limit)

  const totalPages = useMemo(() => {
    if (!data?.total) return 1

    return Math.ceil(data.total / limit)
  }, [data?.total, limit])

  const isSearching =  debouncedSearch.trim().length > 0

  const { data: allPokemons, isLoading: isLoadingAll } =
    useAllPokemons(isSearching)

  const filteredPokemons = useMemo(() => {
    if (isSearching) {
      const pokemons = allPokemons ?? []

      return pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
    }

    return data?.pokemons ?? []
  }, [isSearching, allPokemons, data?.pokemons, debouncedSearch])

  if (isLoading || isLoadingAll) {
    return (
      <section className="space-y-4">
        <div className="h-10 w-52 animate-pulse rounded-xl bg-gray-200" />

        <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
      </section>
    )
  }

  if (isError) {
    return (
      <section className="rounded-2xl bg-red-100 p-6 text-red-700">
        Error loading Pokémons
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div
        className="
          flex
          flex-col
          gap-4
          rounded-3xl
          bg-white
          p-6
          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-around
          "
        >
          <div className="flex gap-2 space-y-2 items-center lg:gap-4 lg:space-y-0">
            

            <img src="/assets/pokemon-header.png" alt="Pokeball" className='w-40' />
            <div>

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-[--color-primary]
                md:text-3xl
              "
            >
              Pokédex
            </h1>

            <p className="max-w-2xl text-sm text-gray-500">
              Explore Pokémon information, abilities and stats with a modern
              Pokédex experience.
            </p>

            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row">
            <PageSizeSelect
              value={limit}
              onChange={(value) => {
                setPage(1)
                setLimit(value)
              }}
            />

            <PokemonSearch
              value={search}
              onChange={(value) => {
                setPage(1)
                setSearch(value)
              }}
            />
          </div>
        </div>
      </div>

      {filteredPokemons.length > 0 ? (
        <PokemonList pokemons={filteredPokemons} />
      ) : (
        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-10
            text-center
            shadow-sm
          "
        >
          <p className="text-gray-500">No Pokémon found.</p>
        </div>
      )}

      {!isSearching && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  )
}
