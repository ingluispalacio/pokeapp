interface Props {
  value: string
  onChange: (value: string) => void
}

export function PokemonSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="w-full">
      <label
        htmlFor="pokemon-search"
        className="sr-only"
      >
        Search Pokémon
      </label>

      <input
        id="pokemon-search"
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search Pokémon..."
        className="
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-4
          py-2
          text-sm
          shadow-sm
          outline-none
          transition
          focus:border-[--color-primary]
          focus:ring-2
          focus:ring-red-100
        "
      />
    </div>
  )
}