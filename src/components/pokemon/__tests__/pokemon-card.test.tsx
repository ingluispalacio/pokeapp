import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

import { PokemonCard } from '@/components/pokemon/pokemon-card'

const pokemon = {
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

describe('PokemonCard', () => {
  it('renders basic pokemon info and navigates when the image is clicked', () => {
    render(<PokemonCard pokemon={pokemon} />)

    expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByAltText(/bulbasaur/i)).toBeInTheDocument()

    fireEvent.click(screen.getByAltText(/bulbasaur/i))
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/bulbasaur')
  })
})
