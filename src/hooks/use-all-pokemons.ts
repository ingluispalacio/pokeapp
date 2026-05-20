import { useQuery } from '@tanstack/react-query'

import { getAllPokemons } from '@/services/pokemon-service'

export function useAllPokemons(
  enabled: boolean,
) {
  return useQuery({
    queryKey: ['all-pokemons'],

    queryFn: getAllPokemons,

    enabled,

    staleTime: 1000 * 60 * 10,
  })
}