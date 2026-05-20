import { vi, describe, it, expect, beforeEach } from 'vitest'

import { httpClient } from '@/api/http-client'
import {
  getAbilityEffect,
  getAllPokemons,
  getPokemonByName,
  getPokemons,
} from '@/services/pokemon-service'

vi.mock('@/api/http-client', () => ({
  httpClient: {
    get: vi.fn(),
  },
}))

const mockedGet = vi.mocked(httpClient.get)

const pokemonResponse = {
  id: 1,
  name: 'bulbasaur',
  weight: 69,
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'bulbasaur.png',
      },
    },
  },
  types: [{ slot: 1, type: { name: 'grass' } }],
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
    },
  ],
}

const secondPokemonResponse = {
  ...pokemonResponse,
  id: 2,
  name: 'ivysaur',
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'ivysaur.png',
      },
    },
  },
}

const abilityEffectResponse = {
  effect_entries: [
    {
      effect: 'Boosts power',
      short_effect: 'Power boost',
      language: { name: 'en' },
    },
  ],
  flavor_text_entries: [
    {
      flavor_text: 'Increases attack power.',
      language: { name: 'en' },
      version_group: { name: 'red-blue' },
    },
  ],
}

describe('pokemon-service', () => {
  beforeEach(() => {
    mockedGet.mockReset()
  })

  it('fetches a page of pokemons and their details', async () => {
    mockedGet.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          count: 20,
          next: null,
          previous: null,
          results: [
            { name: 'bulbasaur', url: '/pokemon/bulbasaur' },
            { name: 'ivysaur', url: '/pokemon/ivysaur' },
          ],
        },
      }),
    )
    mockedGet.mockImplementationOnce(() => Promise.resolve({ data: pokemonResponse }))
    mockedGet.mockImplementationOnce(() => Promise.resolve({ data: secondPokemonResponse }))

    const result = await getPokemons(2, 5)

    expect(mockedGet).toHaveBeenNthCalledWith(
      1,
      '/pokemon?limit=5&offset=5',
    )
    expect(mockedGet).toHaveBeenNthCalledWith(
      2,
      '/pokemon/bulbasaur',
    )
    expect(mockedGet).toHaveBeenNthCalledWith(
      3,
      '/pokemon/ivysaur',
    )
    expect(result).toEqual({
      pokemons: [pokemonResponse, secondPokemonResponse],
      total: 20,
    })
  })

  it('fetches all pokemons and returns details list', async () => {
    mockedGet.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          count: 2,
          next: null,
          previous: null,
          results: [
            { name: 'bulbasaur', url: '/pokemon/bulbasaur' },
            { name: 'ivysaur', url: '/pokemon/ivysaur' },
          ],
        },
      }),
    )
    mockedGet.mockImplementationOnce(() => Promise.resolve({ data: pokemonResponse }))
    mockedGet.mockImplementationOnce(() => Promise.resolve({ data: secondPokemonResponse }))

    const result = await getAllPokemons()

    expect(mockedGet).toHaveBeenNthCalledWith(1, '/pokemon?limit=100')
    expect(mockedGet).toHaveBeenNthCalledWith(2, '/pokemon/bulbasaur')
    expect(mockedGet).toHaveBeenNthCalledWith(3, '/pokemon/ivysaur')
    expect(result).toEqual([pokemonResponse, secondPokemonResponse])
  })

  it('fetches a pokemon by name', async () => {
    mockedGet.mockResolvedValueOnce({ data: pokemonResponse })

    const result = await getPokemonByName('bulbasaur')

    expect(mockedGet).toHaveBeenCalledWith('/pokemon/bulbasaur')
    expect(result).toEqual(pokemonResponse)
  })

  it('fetches ability effect data by url', async () => {
    mockedGet.mockResolvedValueOnce({ data: abilityEffectResponse })

    const url = 'https://pokeapi.co/api/v2/ability/65/'
    const result = await getAbilityEffect(url)

    expect(mockedGet).toHaveBeenCalledWith(url)
    expect(result).toEqual(abilityEffectResponse)
  })
})
