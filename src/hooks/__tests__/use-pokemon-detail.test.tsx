import { vi, describe, it, expect, beforeEach } from 'vitest'

import { usePokemonDetail } from '@/hooks/use-pokemon-detail'

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

describe('usePokemonDetail', () => {
  beforeEach(() => {
    mockedUseQuery.mockReset()
    mockedUseQuery.mockReturnValue(queryResult as any)
  })

  it('calls useQuery with enabled false when name is empty', () => {
    usePokemonDetail('')

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ['pokemon', ''],
      queryFn: expect.any(Function),
      enabled: false,
    })
  })

  it('calls useQuery with enabled true when name is provided', () => {
    usePokemonDetail('pikachu')

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ['pokemon', 'pikachu'],
      queryFn: expect.any(Function),
      enabled: true,
    })
  })
})
