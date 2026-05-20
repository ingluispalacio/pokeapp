import { useState } from 'react'

import { useAbilityEffect } from '@/hooks/use-ability-effect'

interface Props {
  name: string
  url: string
}

export function PokemonAbilityCard({
  name,
  url,
}: Props) {
  const [open, setOpen] = useState(false)

  const { data, isLoading } =
    useAbilityEffect(open ? url : '')

  const effectEntry = data?.effect_entries.find(
    (entry) => entry.language.name === 'en',
  )

  const flavorEntry =
    data?.flavor_text_entries.find(
      (entry) => entry.language.name === 'en',
    )

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-gray-100
        bg-white
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-4
          p-4
          text-left
      cursor-pointer
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-green-100
              text-lg
            "
          >
            ✨
          </div>

          <div>
            <h3 className="font-semibold capitalize text-gray-800">
              {name}
            </h3>

            <p className="text-xs text-gray-400">
              Tap to see effect
            </p>
          </div>
        </div>

        <span
          className="
            text-xl
            text-gray-400
            transition-transform
          "
        >
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-4">
          {isLoading ? (
            <p className="text-sm text-gray-400">
              Loading ability...
            </p>
          ) : (
            <div className="space-y-4">
              {effectEntry?.short_effect && (
                <div
                  className="
                    rounded-xl
                    bg-green-50
                    p-3
                  "
                >
                  <p className="text-sm font-medium text-green-800">
                    {effectEntry.short_effect}
                  </p>
                </div>
              )}

              {effectEntry?.effect && (
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-700">
                    Detailed Effect
                  </h4>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {effectEntry.effect}
                  </p>
                </div>
              )}

              {flavorEntry?.flavor_text && (
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-700">
                    Game Description
                  </h4>

                  <p className="italic text-sm text-gray-500">
                    {flavorEntry.flavor_text.replace(
                      /\f|\n/g,
                      ' ',
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}