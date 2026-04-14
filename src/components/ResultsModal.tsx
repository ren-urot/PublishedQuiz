import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

interface Props {
  score: number
  total: number
  onRestart: () => void
  onSubmit: (name: string, email: string) => void
}

export default function ResultsModal({ score, total, onRestart, onSubmit }: Props) {
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
    }, 300)
    return () => clearTimeout(delay)
  }, [pct])

  // Form state for passed users
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const e: { name?: string; email?: string } = {}
    if (!name.trim()) e.name = 'Full name is required'
    else if (name.trim().split(/\s+/).length < 2) e.name = 'Please enter your first and last name'
    if (!email.trim()) e.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Enter a valid email address'
    return e
  }

  function handleSubmit() {
    setSubmitted(true)
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) onSubmit(name.trim(), email.trim())
  }

  function handleNameChange(v: string) {
    setName(v)
    if (submitted) {
      if (!v.trim()) setErrors((prev) => ({ ...prev, name: 'Full name is required' }))
      else if (v.trim().split(/\s+/).length < 2) setErrors((prev) => ({ ...prev, name: 'Please enter your first and last name' }))
      else setErrors((prev) => ({ ...prev, name: undefined }))
    }
  }

  function handleEmailChange(v: string) {
    setEmail(v)
    if (submitted) {
      if (!v.trim()) setErrors((prev) => ({ ...prev, email: 'Email address is required' }))
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) setErrors((prev) => ({ ...prev, email: 'Enter a valid email address' }))
      else setErrors((prev) => ({ ...prev, email: undefined }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-md shadow-none animate-scale-in">
        <CardHeader className="items-center pb-2 text-center">
          <div className="animate-pop">
            {pct >= 75
              ? <CheckCircle2 className="size-[3rem] text-green-600" strokeWidth={1.75} />
              : pct >= 50
              ? <AlertCircle className="size-[3rem] text-amber-500" strokeWidth={1.75} />
              : <XCircle className="size-[3rem] text-red-500" strokeWidth={1.75} />
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

          {/* Name + email form shown only when passed */}
          {passed && (
            <div className="flex w-full flex-col gap-3 animate-slide-up">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={cn(
                    'w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all',
                    errors.name
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                      : 'border-border focus:border-primary focus:ring-primary/20',
                  )}
                />
                {errors.name && <p className="text-xs text-red-500 pl-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={cn(
                    'w-full rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all',
                    errors.email
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                      : 'border-border focus:border-primary focus:ring-primary/20',
                  )}
                />
                {errors.email && <p className="text-xs text-red-500 pl-1">{errors.email}</p>}
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full active:scale-[0.98] transition-transform"
              >
                Submit
              </Button>
            </div>
          )}

          {/* Retake shown when failed */}
          {!passed && (
            <Button onClick={onRestart} className="w-full active:scale-[0.98] transition-transform">
              Retake Quiz
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
