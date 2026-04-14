import { useState } from 'react'
import Navbar from '@/components/Navbar'
import QuizCard from '@/components/QuizCard'
import NavRow from '@/components/NavRow'
import ResultsModal from '@/components/ResultsModal'
import ConfirmationPage from '@/components/ConfirmationPage'
import QuizInfoSection from '@/components/QuizInfoSection'
import QuestionTracker from '@/components/QuestionTracker'
import { useQuiz } from '@/hooks/useQuiz'
import { quizMeta } from '@/data/quizMeta'

export default function App() {
  const quiz = useQuiz()
  const [completion, setCompletion] = useState<{ name: string; email: string } | null>(null)

  if (completion) {
    return (
      <ConfirmationPage
        name={completion.name}
        score={quiz.score}
        total={quiz.total}
      />
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="flex w-full max-w-2xl flex-col gap-5">
          {/* Quiz title, content link, accreditation code, CPD points */}
          <QuizInfoSection
            title={quizMeta.title}
            contentUrl={quizMeta.contentUrl}
            accreditationCode={quizMeta.accreditationCode}
            cpdPoints={quizMeta.cpdPoints}
          />

          {/* Question tracker: position + correct/incorrect per bubble */}
          <QuestionTracker
            total={quiz.total}
            current={quiz.current}
            answered={quiz.answered}
            selected={quiz.selected}
            questions={quiz.questions}
            onJump={quiz.goToQuestion}
          />

          {/* Question card — key forces remount + entrance animation on change */}
          <QuizCard
            key={quiz.current}
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
        <ResultsModal
          score={quiz.score}
          total={quiz.total}
          onRestart={quiz.restart}
          onSubmit={(name, email) => setCompletion({ name, email })}
        />
      )}
    </div>
  )
}
