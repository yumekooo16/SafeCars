'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function VehicleGallery({ imageUrls, altBase }) {
  const [index, setIndex] = useState(0)
  const [broken, setBroken] = useState({})
  const [thumbBroken, setThumbBroken] = useState({})

  if (!imageUrls?.length) {
    return (
      <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-500">
        Aucune photo disponible
      </div>
    )
  }

  const current = imageUrls[index]
  const isBroken = broken[index]

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900">
        {!isBroken ? (
          <Image
            src={current}
            alt={`${altBase} — photo ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
            unoptimized={current.startsWith('/uploads/')}
            onError={() => setBroken((b) => ({ ...b, [index]: true }))}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-500">Image indisponible</div>
        )}

        {imageUrls.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80"
              aria-label="Photo précédente"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i === imageUrls.length - 1 ? 0 : i + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80"
              aria-label="Photo suivante"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
              {index + 1} / {imageUrls.length}
            </div>
          </>
        )}
      </div>

      {imageUrls.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {imageUrls.map((url, i) => (
            <button
              key={`${url}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === index ? 'border-blue-500' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              {!thumbBroken[i] ? (
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={() => setThumbBroken((b) => ({ ...b, [i]: true }))}
                  unoptimized={url.startsWith('/uploads/')}
                />
              ) : (
                <div className="absolute inset-0 bg-zinc-800" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
