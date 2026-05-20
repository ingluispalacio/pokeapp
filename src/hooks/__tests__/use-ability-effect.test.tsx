import { vi, describe, it, expect, beforeEach } from 'vitest'

import { useAbilityEffect } from '@/hooks/use-ability-effect'

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

describe('useAbilityEffect', () => {
  beforeEach(() => {
    mockedUseQuery.mockReset()
    mockedUseQuery.mockReturnValue(queryResult as any)
  })

  it('calls useQuery with enabled false when url is empty', () => {
    useAbilityEffect('')

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ['ability', ''],
      queryFn: expect.any(Function),
      enabled: false,
    })
  })

  it('calls useQuery with enabled true when url is provided', () => {
    const url = 'https://pokeapi.co/api/v2/ability/65/'
    useAbilityEffect(url)

    expect(mockedUseQuery).toHaveBeenCalledWith({
      queryKey: ['ability', url],
      queryFn: expect.any(Function),
      enabled: true,
    })
  })
})
