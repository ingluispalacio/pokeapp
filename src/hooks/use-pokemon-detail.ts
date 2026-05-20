import { useQuery } from '@tanstack/react-query'

import { getPokemonByName } from '@/services/pokemon-service'

export function usePokemonDetail(name: string) {
  return useQuery({
    queryKey: ['pokemon', name],

    queryFn: () => getPokemonByName(name),

    enabled: !!name,
  })
}