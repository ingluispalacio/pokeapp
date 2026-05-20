import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest'
import type { UseQueryResult } from '@tanstack/react-query'
import type { Pokemon } from '@/types/pokemon'

const mockNavigate = vi.fn()

vi.mock('@/hooks/use-pokemon-detail')
vi.mock('@/components/pokemon/pokemon-ability-card', () => ({
  PokemonAbilityCard: ({ name }: { name: string }) => <div>{name}</div>,
}))
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ name: 'bulbasaur' }),
  }
})

import { PokemonDetailsPage } from '@/pages/pokemon-details-page'
import { usePokemonDetail } from '@/hooks/use-pokemon-detail'

const mockedUsePokemonDetail = vi.mocked(usePokemonDetail)

describe('PokemonDetailsPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders a loading state while pokemon is loading', () => {
    // Aplicamos la buena práctica usando 'unknown' como puente intermedio de tipos
    mockedUsePokemonDetail.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isPending: true,
    } as unknown as UseQueryResult<Pokemon, Error>)

    render(<PokemonDetailsPage />)

    expect(screen.getByText(/loading pokémon/i)).toBeInTheDocument()
  })

  it('renders an error state when pokemon is unavailable', () => {
    mockedUsePokemonDetail.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isPending: false,
    } as unknown as UseQueryResult<Pokemon, Error>)

    render(<PokemonDetailsPage />)

    expect(screen.getByText(/pokémon not found/i)).toBeInTheDocument()
  })

  it('renders detailed pokemon information and back button', () => {
    mockedUsePokemonDetail.mockReturnValue({
      data: {
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
      isLoading: false,
      isError: false,
      isPending: false,
    } as unknown as UseQueryResult<Pokemon, Error>)

    render(<PokemonDetailsPage />)

    expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByText('#001')).toBeInTheDocument()
    expect(screen.getByText(/weight/i)).toBeInTheDocument()
    expect(screen.getByText('69')).toBeInTheDocument()
    expect(screen.getByText(/overgrow/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /← back/i }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})