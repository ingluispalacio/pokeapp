import { pokemonTypeColors } from '@/utils/pokemon-type-colors'

interface Props {
  type: string
}

const typeIcons: Record<string, string> = {
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  psychic: '🔮',
  ice: '❄️',
  fighting: '🥊',
  poison: '☠️',
  ground: '🌍',
  flying: '🕊️',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '✨',
  normal: '●',
}

export function PokemonTypeBadge({
  type,
}: Props) {
  const colors =
    pokemonTypeColors[type] ??
    'bg-gray-100 text-gray-700 border-gray-200'

  const icon = typeIcons[type] ?? '●'

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1
        rounded-full
        border
        px-3
        py-1
        text-xs
        font-semibold
        uppercase
        tracking-wide
        ${colors}
      `}
    >
      <span>{icon}</span>

      {type}
    </span>
  )
}