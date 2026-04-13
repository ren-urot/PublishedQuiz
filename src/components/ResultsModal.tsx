import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

interface Props {
  score: number
  total: number
  onRestart: () => void
}

export default function ResultsModal({ score, total, onRestart }: Props) {
  const pct = Math.round((score / total) * 100)
  const passed = pct >= 75

  const title = pct >= 75 ? 'Well done!' : pct >= 50 ? 'Good effort!' : 'Keep learning!'
  const message =
    pct >= 75
      ? `You answered ${score} out of ${total} questions correctly. Great work on this CPD activity!`
      : `You answered ${score} out of ${total} questions correctly. Review the explanations to strengthen your understanding.`

  // Count-up animation for the percentage
  const [displayPct, setDisplayPct] = useState(0)
  useEffect(() => {
    const delay = setTimeout(() => {
      const steps = 50
      const increment = pct / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= pct) {
          setDisplayPct(pct)
          clearInterval(timer)
        } else {
          setDisplayPct(Math.round(current))
        }
      }, 20)
      return () => clearInterval(timer)
    }, 300) // start after modal entrance animation
    return () => clearTimeout(delay)
  }, [pct])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-md shadow-xl animate-scale-in">
        <CardHeader className="items-center pb-2 text-center">
          <div className={cn(
            'flex h-16 w-16 items-center justify-center rounded-full animate-pop',
            pct >= 75 ? 'bg-green-100' : pct >= 50 ? 'bg-amber-100' : 'bg-red-100',
          )}>
            {pct >= 75
              ? <CheckCircle2 className="size-9 text-green-600" strokeWidth={1.75} />
              : pct >= 50
              ? <AlertCircle className="size-9 text-amber-500" strokeWidth={1.75} />
              : <XCircle className="size-9 text-red-500" strokeWidth={1.75} />
            }
          </div>
          <h2 className="mt-3 text-2xl font-extrabold text-foreground">{title}</h2>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-5 text-center">
          <p className={cn(
            'text-6xl font-extrabold tabular-nums transition-all duration-100',
            passed ? 'text-primary' : 'text-red-500',
          )}>
            {displayPct}%
          </p>

          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{message}</p>

          <div className="flex w-full justify-center gap-10 border-y border-border py-4">
            <div className="flex flex-col items-center gap-1 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <span className="text-2xl font-extrabold text-green-600">{score}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Correct</span>
            </div>
            <div className="flex flex-col items-center gap-1 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <span className="text-2xl font-extrabold text-red-500">{total - score}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Incorrect</span>
            </div>
            <div className="flex flex-col items-center gap-1 animate-slide-up" style={{ animationDelay: '600ms' }}>
              <span className="text-2xl font-extrabold text-foreground">{total}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Total</span>
            </div>
          </div>

          <Button onClick={onRestart} className="w-full active:scale-[0.98] transition-transform">
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
