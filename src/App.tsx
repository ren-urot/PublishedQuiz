import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import QuizCard from '@/components/QuizCard'
import NavRow from '@/components/NavRow'
import ResultsModal from '@/components/ResultsModal'
import ConfirmationPage from '@/components/ConfirmationPage'
import QuizInfoSection from '@/components/QuizInfoSection'
import QuestionTracker from '@/components/QuestionTracker'
import ContentUploadPage, { type ContentType, type ContentData } from '@/components/ContentUploadPage'
import { useQuiz } from '@/hooks/useQuiz'
import { quizMeta } from '@/data/quizMeta'

type Page = 'upload' | 'quiz'

interface ActiveContent {
  url: string
  isPdf: boolean
  noData: boolean
  contentType: ContentType
  activityDate: string
}

export default function App() {
  const quiz = useQuiz()
  const [page, setPage] = useState<Page>('upload')
  const [completion, setCompletion] = useState<{ name: string; email: string } | null>(null)
  const [activeContent, setActiveContent] = useState<ActiveContent>({
    url: quizMeta.contentUrl,
    isPdf: quizMeta.contentUrl.toLowerCase().endsWith('.pdf'),
    noData: false,
    contentType: 'written',
    activityDate: '',
  })

  useEffect(() => {
    return () => {
      if (activeContent.url.startsWith('blob:')) URL.revokeObjectURL(activeContent.url)
    }
  }, [activeContent.url])

  function handleAssess(contentType: ContentType, data: ContentData) {
    if (contentType === 'transcripts') {
      setActiveContent({ url: '', isPdf: false, noData: true, contentType, activityDate: data.date ?? '' })
    } else {
      let url = ''
      let isPdf = false
      if (data.inputType === 'pdf' && data.file) {
        url = URL.createObjectURL(data.file)
        isPdf = true
      } else if (data.inputType === 'url' && data.url) {
        url = data.url
        isPdf = data.url.toLowerCase().endsWith('.pdf')
      }
      setActiveContent({ url, isPdf, noData: false, contentType, activityDate: data.date ?? '' })
    }
    quiz.restart()
    setPage('quiz')
  }

  if (page === 'upload') {
    return <ContentUploadPage onAssess={handleAssess} />
  }

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
      <Navbar variant="maclean" />

      <main className="flex flex-1 items-start justify-center px-4 pb-4 pt-4 sm:px-8 sm:pb-8 sm:pt-6">
        <div className="flex w-full max-w-[942px] flex-col gap-2">
          <QuizInfoSection
            title={quizMeta.title}
            contentType={activeContent.contentType}
            contentUrl={activeContent.url}
            isPdf={activeContent.isPdf}
            noData={activeContent.noData}
            accreditationCode={quizMeta.accreditationCode}
            cpdPoints={quizMeta.cpdPoints}
            activityDate={activeContent.activityDate}
          />

          <QuestionTracker
            total={quiz.total}
            current={quiz.current}
            answered={quiz.answered}
            selected={quiz.selected}
            questions={quiz.questions}
            onJump={quiz.goToQuestion}
          />

          <QuizCard
            key={quiz.current}
            question={quiz.questions[quiz.current]}
            questionNumber={quiz.current + 1}
            selectedAnswer={quiz.selected[quiz.current]}
            isAnswered={quiz.isAnswered}
            onSelect={quiz.selectAnswer}
          />

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
