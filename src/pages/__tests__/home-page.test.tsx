import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'


import type { UseQueryResult } from '@tanstack/react-query'
import type { Pokemon } from '@/types/pokemon'

import { HomePage } from '@/pages/home-page'
import { useAllPokemons } from '@/hooks/use-all-pokemons'
import { useDebounce } from '@/hooks/use-debounce'
import { usePokemons } from '@/hooks/use-pokemons'

vi.mock('@/hooks/use-pokemons')
vi.mock('@/hooks/use-all-pokemons')
vi.mock('@/hooks/use-debounce')

const mockedUsePokemons = vi.mocked(usePokemons)
const mockedUseAllPokemons = vi.mocked(useAllPokemons)
const mockedUseDebounce = vi.mocked(useDebounce)

// samplePokemons ahora cumple perfectamente con el tipo Pokemon[]
const samplePokemons: Pokemon[] = [
  {
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
  },
  {
    id: 2,
    name: 'ivysaur',
    weight: 130,
    sprites: {
      other: {
        'official-artwork': {
          front_default: 'ivysaur.png',
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
  },
]

// Definimos la estructura exacta que retorna tu hook de paginación
interface PokemonsResponse {
  total: number
  pokemons: Pokemon[]
}

describe('HomePage', () => {
  beforeEach(() => {
    mockedUseDebounce.mockReturnValue('')
    
    mockedUsePokemons.mockReturnValue({
      data: { total: samplePokemons.length, pokemons: samplePokemons },
      isLoading: false,
      isError: false,
      isPending: false,
    } as unknown as UseQueryResult<PokemonsResponse, Error>)

    mockedUseAllPokemons.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      isPending: false,
    } as unknown as UseQueryResult<Pokemon[], Error>)
  })

  it('renders the pokédex and list of pokémons', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /pokédex/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /search pokémon/i })).toHaveValue('')
    expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ivysaur/i })).toBeInTheDocument()
    expect(screen.getByText(/página/i)).toBeInTheDocument()
  })

  it('changes the page size selection', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    const pageSizeSelect = screen.getByRole('combobox', { name: /pokémons/i })
    expect(pageSizeSelect).toHaveValue('10')
    fireEvent.change(pageSizeSelect, { target: { value: '20' } })
    expect(pageSizeSelect).toHaveValue('20')
  })

  it('shows no results when search returns none', () => {
    mockedUseDebounce.mockReturnValue('missing')
    
    mockedUseAllPokemons.mockReturnValue({ 
      data: [], 
      isLoading: false,
      isError: false,
      isPending: false,
    } as unknown as UseQueryResult<Pokemon[], Error>)

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/no pokémon found/i)).toBeInTheDocument()
    expect(screen.queryByText(/página/i)).not.toBeInTheDocument()
  })

  it('displays an error state when pokémon loading fails', () => {
    mockedUsePokemons.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isPending: false,
    } as unknown as UseQueryResult<PokemonsResponse, Error>)

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/error loading pokémons/i)).toBeInTheDocument()
  })
})