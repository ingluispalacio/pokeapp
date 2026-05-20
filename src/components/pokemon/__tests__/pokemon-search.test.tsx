import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { PokemonSearch } from '@/components/pokemon/pokemon-search'

describe('PokemonSearch', () => {
  it('renders the search input and forwards value changes', () => {
    const onChange = vi.fn()

    render(<PokemonSearch value="" onChange={onChange} />)

    const input = screen.getByRole('textbox', {
      name: /search pokémon/i,
    })

    expect(input).toHaveValue('')

    fireEvent.change(input, { target: { value: 'pikachu' } })
    expect(onChange).toHaveBeenCalledWith('pikachu')
  })
})
