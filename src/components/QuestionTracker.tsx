import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Question } from '@/types/quiz'

interface Props {
  total: number
  current: number
  answered: boolean[]
  selected: (number | null)[]
  questions: Question[]
  onJump: (index: number) => void
}

export default function QuestionTracker({
  total,
  current,
  answered,
  selected,
  questions,
  onJump,
}: Props) {
  // Allow jumping to any answered question, or the very next unanswered one
  const lastAnswered = answered.lastIndexOf(true)

  function getStatus(i: number) {
    if (!answered[i]) return i === current ? 'current' : 'unanswered'
    return selected[i] === questions[i].correct ? 'correct' : 'incorrect'
  }

  return (
    <div className="flex flex-col gap-1">
      {/* Bubble row */}
      <div className="flex items-center w-full">
        {Array.from({ length: total }).map((_, i) => {
          const status = getStatus(i)
          const clickable = i <= lastAnswered + 1

          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              {/* Bubble */}
              <button
                onClick={() => clickable && onJump(i)}
                disabled={!clickable}
                title={`Question ${i + 1}`}
                className={cn(
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300',
                  status === 'unanswered' && i !== current && 'bg-background border-border text-muted-foreground cursor-not-allowed',
                  status === 'current' && 'bg-primary border-primary text-white scale-110 shadow-sm',
                  status === 'correct' && 'bg-green-500 border-green-500 text-white cursor-pointer hover:opacity-90',
                  status === 'incorrect' && 'bg-red-500 border-red-500 text-white cursor-pointer hover:opacity-90',
                )}
              >
                {status === 'correct' && <Check className="size-3.5" strokeWidth={3} />}
                {status === 'incorrect' && <X className="size-3.5" strokeWidth={3} />}
                {(status === 'unanswered' || status === 'current') && i + 1}
              </button>

              {/* Connector line */}
              {i < total - 1 && (
                <div className={cn(
                  'flex-1 h-px mx-1 transition-colors duration-300',
                  answered[i] ? 'bg-border' : 'bg-border/50',
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Summary row */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-0.5">
        <span>
          {answered.filter(Boolean).length} of {total} answered
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <Check className="size-3" strokeWidth={3} />
            {answered.filter((a, i) => a && selected[i] === questions[i].correct).length} correct
          </span>
          <span className="flex items-center gap-1 text-red-500 font-semibold">
            <X className="size-3" strokeWidth={3} />
            {answered.filter((a, i) => a && selected[i] !== questions[i].correct).length} incorrect
          </span>
        </span>
      </div>
    </div>
  )
}
