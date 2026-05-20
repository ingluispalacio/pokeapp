import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest'

import { Pagination } from '@/components/common/pagination'

describe('Pagination', () => {
  it('renders page controls and advances to the next page', () => {
    const onPageChange = vi.fn()

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
      />,
    )

    const disabledButtons = screen.getAllByRole('button', { name: /no more pages/i })
    expect(disabledButtons[0]).toBeDisabled()
    const nextButton = screen.getAllByRole('button', { name: /next/i })[0]
    expect(nextButton).toBeEnabled()

    fireEvent.click(nextButton)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('disables next button on the last page', () => {
    const onPageChange = vi.fn()

    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={onPageChange}
      />,
    )

    const disabledButtons = screen.getAllByRole('button', { name: /no more pages/i })
    expect(disabledButtons[0]).toBeDisabled()
  })
})
