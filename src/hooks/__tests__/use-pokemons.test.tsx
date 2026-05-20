import { vi, describe, it, expect, beforeEach } from 'vitest'

import { usePokemons } from '@/hooks/use-pokemons'

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

describe('usePokemons', () => {
  beforeEach(() => {
    mockedUseQuery.mockReset()
    mockedUseQuery.mockReturnValue(queryResult as any)
  })

  it('calls useQuery with the correct query key and fn', () => {
    usePokemons(3, 15)

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ['pokemons', 3, 15],
      queryFn: expect.any(Function),
    })
  })
})
