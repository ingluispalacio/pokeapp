export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null

  results: PokemonResult[]
}

export interface PokemonResult {
  name: string
  url: string
}

export interface Pokemon {
  id: number
  name: string
  weight: number

  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }

  types: PokemonType[]

  abilities: PokemonAbility[]
}

export interface PokemonType {
  slot: number

  type: {
    name: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
}

export interface AbilityEffect {
  effect_entries: AbilityEffectEntry[]
  flavor_text_entries: FlavorTextEntry[]
}

export interface AbilityEffectEntry {
  effect: string
  short_effect: string

  language: {
    name: string
  }
}

export interface FlavorTextEntry {
  flavor_text: string

  language: {
    name: string
  }

  version_group: {
    name: string
  }
}