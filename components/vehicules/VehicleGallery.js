'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function VehicleGallery({ imageUrls, altBase, videoUrls = [] }) {
  const [index, setIndex] = useState(0)
  const [broken, setBroken] = useState({})
  const [thumbBroken, setThumbBroken] = useState({})
  const [playing, setPlaying] = useState(null)

  if (!imageUrls?.length) {
    return (
      <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text-subtle)]">
        Aucune photo disponible
      </div>
    )
  }

  const current = imageUrls[index]
  const isBroken = broken[index]

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-raised)]">
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
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-subtle)]">Image indisponible</div>
        )}

        {imageUrls.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 p-3 text-[var(--text)] hover:border-[var(--border-accent)]"
              aria-label="Photo précédente"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i === imageUrls.length - 1 ? 0 : i + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 p-3 text-[var(--text)] hover:border-[var(--border-accent)]"
              aria-label="Photo suivante"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 px-3 py-1 text-sm text-[var(--text-muted)]">
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
                i === index ? 'border-[var(--silver)]' : 'border-transparent opacity-70 hover:opacity-100'
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
                <div className="absolute inset-0 bg-[var(--surface)]" />
              )}
            </button>
          ))}
        </div>
      )}

      {videoUrls && videoUrls.length > 0 && (
        <div className="mt-3 flex items-center justify-center gap-3">
          {videoUrls.map((v, i) => {
            const labels = ['Extérieur Vehicule', 'Intérieur Vehicule', 'Vehicule En mouvement']
            return (
              <button
                key={v + '-' + i}
                type="button"
                onClick={() => setPlaying(v)}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] hover:border-[var(--border-accent)]"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10">▶</span>
                <span>{labels[i] ?? `Vidéo ${i + 1}`}</span>
              </button>
            )
          })}
        </div>
      )}

      {playing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setPlaying(null)}>
          <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video bg-black">
              <video src={playing} controls autoPlay className="w-full h-full object-contain" />
            </div>
            <div className="p-3 text-right">
              <button onClick={() => setPlaying(null)} className="rounded px-4 py-2 bg-white/10 text-white">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
