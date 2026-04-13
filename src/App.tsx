import Navbar from '@/components/Navbar'
import QuizCard from '@/components/QuizCard'
import NavRow from '@/components/NavRow'
import ResultsModal from '@/components/ResultsModal'
import { Progress } from '@/components/ui/progress'
import { useQuiz } from '@/hooks/useQuiz'

export default function App() {
  const quiz = useQuiz()

  const progressValue = ((quiz.current + 1) / quiz.total) * 100
  const answeredCount = quiz.answered.filter(Boolean).length

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="flex w-full max-w-2xl flex-col gap-5">
          {/* Page title */}
          <h1 className="text-center text-2xl font-bold text-foreground">Published Quiz</h1>
          {/* Progress header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Question {quiz.current + 1} of {quiz.total}
              </span>
              {answeredCount > 0 && (
                <span className="text-xs font-semibold text-muted-foreground">
                  {quiz.score}/{quiz.total} correct
                </span>
              )}
            </div>
            <Progress value={progressValue} className="h-1.5" />
          </div>

          {/* Question card */}
          <QuizCard
            question={quiz.questions[quiz.current]}
            questionNumber={quiz.current + 1}
            selectedAnswer={quiz.selected[quiz.current]}
            isAnswered={quiz.isAnswered}
            onSelect={quiz.selectAnswer}
          />

          {/* Navigation */}
          <NavRow
            onPrev={quiz.prevQuestion}
            onNext={quiz.nextQuestion}
            isFirst={quiz.isFirst}
            isLast={quiz.isLast}
            isAnswered={quiz.isAnswered}
          />
        </div>
      </main>

      {quiz.showResults && (
        <ResultsModal score={quiz.score} total={quiz.total} onRestart={quiz.restart} />
      )}
    </div>
  )
}
