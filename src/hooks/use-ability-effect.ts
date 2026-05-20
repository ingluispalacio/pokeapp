import { useQuery } from '@tanstack/react-query'

import { getAbilityEffect } from '@/services/pokemon-service'

export function useAbilityEffect(url: string) {
  return useQuery({
    queryKey: ['ability', url],

    queryFn: () => getAbilityEffect(url),

    enabled: !!url,
  })
}