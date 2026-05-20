interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  const textNext = isLastPage ? 'No more pages' : 'Next'
  const textPrevious = isFirstPage ? 'No more pages' : 'Previous'

  return (
    <div className="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3 sm:px-6 rounded-xl shadow-sm mt-4">
      {/* Vista Mobile: Botones simples */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
            {textPrevious}
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className="inline-flex items-center rounded-md border cursor-pointer border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          {textNext}
        </button>
      </div>

      {/* Vista Desktop/Tablet */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Página <span className="font-semibold text-gray-900">{currentPage}</span> de{' '}
            <span className="font-semibold text-gray-900">{totalPages}</span>
          </p>
        </div>

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-lg shadow-xs gap-2" aria-label="Pagination">
            {/* Botón Anterior */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={isFirstPage}
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              ← {textPrevious}
            </button>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={isLastPage}
              className="inline-flex items-center rounded-lg border border-transparent bg-(--color-primary) px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {textNext} →
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}