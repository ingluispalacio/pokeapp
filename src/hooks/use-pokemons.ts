import { useQuery } from '@tanstack/react-query'

import { getPokemons } from '@/services/pokemon-service'

export function usePokemons(
  page: number,
  limit: number = 10,
) {
  return useQuery({
    queryKey: ['pokemons', page, limit],

    queryFn: () => getPokemons(page, limit),
  })
}