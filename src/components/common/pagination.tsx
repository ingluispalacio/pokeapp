import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const textNext = isLastPage ? 'No more pages' : 'Next'
  const textPrevious = isFirstPage ? 'No more pages' : 'Previous'

  return (
    <div className="mt-4 rounded-xl border-t border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-6">
      {/* Vista Mobile */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="
            inline-flex
            items-center
            gap-2
            rounded-md
            border
            border-gray-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            transition-colors
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <ChevronLeft size={18} />
          {textPrevious}
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className="
            inline-flex
            cursor-pointer
            items-center
            gap-2
            rounded-md
            border
            border-gray-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            transition-colors
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {textNext}
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Vista Desktop/Tablet */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Página{' '}
            <span className="font-semibold text-gray-900">
              {currentPage}
            </span>{' '}
            de{' '}
            <span className="font-semibold text-gray-900">
              {totalPages}
            </span>
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex gap-2 rounded-lg shadow-xs"
            aria-label="Pagination"
          >
            {/* Botón anterior */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={isFirstPage}
              className="
                inline-flex
                cursor-pointer
                items-center
                gap-2
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                transition-all
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:border-gray-200
                disabled:bg-gray-50
                disabled:text-gray-400
              "
            >
              <ChevronLeft size={18} />
              {textPrevious}
            </button>

            {/* Botón siguiente */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={isLastPage}
              className="
                inline-flex
                cursor-pointer
                items-center
                gap-2
                rounded-lg
                border
                border-transparent
                bg-(--color-primary)
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition-all
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:border-gray-200
                disabled:bg-gray-50
                disabled:text-gray-400
              "
            >
              {textNext}
              <ChevronRight size={18} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}