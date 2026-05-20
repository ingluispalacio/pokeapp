import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

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

const samplePokemons = [
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

describe('HomePage', () => {
  beforeEach(() => {
    mockedUseDebounce.mockReturnValue('')
    mockedUsePokemons.mockReturnValue({
      data: { total: samplePokemons.length, pokemons: samplePokemons },
      isLoading: false,
      isError: false,
    })
    mockedUseAllPokemons.mockReturnValue({
      data: [],
      isLoading: false,
    })
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
    mockedUseAllPokemons.mockReturnValue({ data: [], isLoading: false })

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
    })

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/error loading pokémons/i)).toBeInTheDocument()
  })
})
