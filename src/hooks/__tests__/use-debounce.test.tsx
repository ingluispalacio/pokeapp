import { act, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { useDebounce } from '@/hooks/use-debounce'

function TestComponent({ value }: { value: string }) {
  const debouncedValue = useDebounce(value, 50)
  return <div>{debouncedValue}</div>
}

describe('useDebounce', () => {
  it('delays the value update until the timeout expires', () => {
    vi.useFakeTimers()

    const { rerender } = render(<TestComponent value="" />)

    rerender(<TestComponent value="hello" />)
    expect(screen.queryByText('hello')).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(50)
    })

    expect(screen.getByText('hello')).toBeInTheDocument()

    vi.useRealTimers()
  })
})
