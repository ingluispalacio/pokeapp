import { vi, describe, it, expect, beforeEach } from 'vitest'

import { useAllPokemons } from '@/hooks/use-all-pokemons'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>(
    '@tanstack/react-query',
  )

  return {
    ...actual,
    useQuery: vi.fn(),
  }
})

import { useQuery } from '@tanstack/react-query'

const mockedUseQuery = vi.mocked(useQuery)
const queryResult = { data: null, isLoading: false, isError: false }

describe('useAllPokemons', () => {
  beforeEach(() => {
    mockedUseQuery.mockReset()
    mockedUseQuery.mockReturnValue(queryResult as any)
  })

  it('calls useQuery with enabled and staleTime options', () => {
    useAllPokemons(true)

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ['all-pokemons'],
      queryFn: expect.any(Function),
      enabled: true,
      staleTime: 1000 * 60 * 10,
    })
  })
})
