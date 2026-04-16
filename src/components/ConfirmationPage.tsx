import { CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import logo from '@/assets/maclean-logo.png'

interface Props {
  name: string
  score: number
  total: number
}

export default function ConfirmationPage({ name, score, total }: Props) {
  const pct = Math.round((score / total) * 100)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className="w-full border-b border-[#ff9f4b] bg-white/95">
        <div className="mx-auto max-w-3xl flex h-14 items-center justify-center px-4 sm:px-6">
          <a href="/" className="flex items-center" aria-label="CPDcheck home">
            <img src={logo} alt="Maclean Financial" className="h-9 w-auto" />
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md shadow-none animate-scale-in text-center">
          <CardContent className="flex flex-col items-center gap-6 pt-10 pb-10">

            {/* Icon */}
            <div className="animate-pop">
              <CheckCircle2 className="size-[4.3rem] text-green-600" strokeWidth={1.75} />
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-2 animate-slide-up">
              <h1 className="text-2xl font-extrabold text-foreground">CPD Completed!</h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Well done, <span className="font-semibold text-foreground">{name}</span>!
                Your completion has been recorded.
              </p>
            </div>

            {/* Score pill */}
            <div
              className="flex items-center gap-3 rounded-xl border border-border bg-secondary px-6 py-4 animate-slide-up"
              style={{ animationDelay: '150ms' }}
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-3xl font-extrabold text-primary">{pct}%</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Score</span>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-3xl font-extrabold text-green-600">{score}/{total}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Correct</span>
              </div>
            </div>

            {/* Subtext */}
            <p
              className="text-xs text-muted-foreground animate-fade-in"
              style={{ animationDelay: '300ms' }}
            >
              A confirmation will be sent to your email shortly.
            </p>

          </CardContent>
        </Card>
      </main>
    </div>
  )
}
