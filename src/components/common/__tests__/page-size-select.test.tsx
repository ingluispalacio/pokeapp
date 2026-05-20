import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { PageSizeSelect } from '@/components/common/page-size-select'

describe('PageSizeSelect', () => {
  it('renders options and emits changes', () => {
    const handleChange = vi.fn()

    render(
      <PageSizeSelect
        value={10}
        onChange={handleChange}
      />,
    )

    const select = screen.getByRole('combobox', { name: /pokémons/i })
    expect(select).toHaveValue('10')

    fireEvent.change(select, { target: { value: '20' } })
    expect(handleChange).toHaveBeenCalledWith(20)
  })
})
