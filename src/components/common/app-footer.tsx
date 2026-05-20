export function AppFooter() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-2
          px-4
          py-6
          text-center
          text-sm
          text-gray-500
          sm:px-6
          lg:px-8
        "
      >
        <p>Pokédex Technical Challenge</p>

        <p>
          Built with React, Tailwind and TanStack Query
        </p>

        <p className="font-medium text-gray-700">
          Developed by Ing. Luis Palacio
        </p>
      </div>
    </footer>
  )
}