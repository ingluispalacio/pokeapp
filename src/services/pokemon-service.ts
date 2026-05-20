import { httpClient } from '@/api/http-client'

import type {
    AbilityEffect,
  Pokemon,
  PokemonListResponse,
} from '@/types/pokemon'


export async function getPokemons(page: number, limit: number = 10) {
  const offset = (page - 1) * limit

  const { data } = await httpClient.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  )

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const response = await httpClient.get<Pokemon>(
        `/pokemon/${pokemon.name}`,
      )
      return response.data
    }),
  )

  return {
    pokemons: pokemonDetails,
    total: data.count,
  }
}

export async function getAllPokemons() {
  const { data } =
    await httpClient.get<PokemonListResponse>(
      '/pokemon?limit=100',
    )

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const response =
        await httpClient.get<Pokemon>(
          `/pokemon/${pokemon.name}`,
        )

      return response.data
    }),
  )

  return pokemonDetails
}

export async function getPokemonByName(
  name: string,
) {
  const { data } = await httpClient.get<Pokemon>(
    `/pokemon/${name}`,
  )

  return data
}

export async function getAbilityEffect(
  url: string,
) {
  const { data } =
    await httpClient.get<AbilityEffect>(url)

  return data
}