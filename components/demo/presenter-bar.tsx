'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Check,
  ListOrdered,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDemo } from './demo-context'
import { chapters } from '@/lib/demo-data'

export function PresenterBar() {
  const { state, dispatch } = useDemo()
  const current = chapters.find((c) => c.n === state.chapter) ?? chapters[0]

  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-t border-border bg-card px-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="grid size-6 place-items-center rounded-md bg-primary text-[0.7rem] font-semibold text-primary-foreground">
          {current.n}
        </span>
        <span className="hidden font-medium text-foreground sm:inline">
          {current.title}
        </span>
        <span className="hidden md:inline">
          · Chapter {current.n} of {chapters.length}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch({ type: 'prev' })}
          disabled={state.chapter <= 1}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        <ChapterSelector
          currentChapter={state.chapter}
          onSelect={(n) => dispatch({ type: 'goToChapter', chapter: n })}
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch({ type: 'next' })}
          disabled={state.chapter >= chapters.length}
        >
          Next chapter
          <ChevronRight className="size-4" />
        </Button>

        <div className="mx-1 h-6 w-px bg-border" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: 'reset' })}
        >
          <RotateCcw className="size-4" />
          Reset demo
        </Button>
      </div>
    </div>
  )
}

function ChapterSelector({
  currentChapter,
  onSelect,
}: {
  currentChapter: number
  onSelect: (n: number) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="secondary"
        size="sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <ListOrdered className="size-4" />
        Chapters
      </Button>

      {open ? (
        <div
          role="listbox"
          className="absolute bottom-full right-1/2 z-50 mb-2 w-72 translate-x-1/2 overflow-hidden rounded-surface border border-border bg-popover p-1.5 shadow-xl"
        >
          <div className="px-2.5 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Jump to chapter
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {chapters.map((c) => {
              const active = c.n === currentChapter
              return (
                <li key={c.n}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onSelect(c.n)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                      active
                        ? 'bg-raseen-muted text-raseen'
                        : 'text-foreground hover:bg-muted',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-5 shrink-0 place-items-center rounded text-[0.7rem] font-semibold',
                        active
                          ? 'bg-raseen text-raseen-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {c.n}
                    </span>
                    <span className="flex-1">{c.title}</span>
                    {active ? <Check className="size-4" /> : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
