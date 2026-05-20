interface Props {
  value: number
  onChange: (value: number) => void
}

export function PageSizeSelect({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="page-size" className="text-sm text-gray-500">
        Pokémons:
      </label>

      <select
        id="page-size"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          cursor-pointer
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          py-2
          text-sm
          outline-none
          transition
          focus:border-[--color-primary]
        "
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  )
}
