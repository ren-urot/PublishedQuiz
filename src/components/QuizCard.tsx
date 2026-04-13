import { Card, CardContent, CardHeader } from '@/components/ui/card'
import AnswerOption from '@/components/AnswerOption'
import FeedbackBox from '@/components/FeedbackBox'
import type { Question } from '@/types/quiz'

interface Props {
  question: Question
  questionNumber: number
  selectedAnswer: number | null
  isAnswered: boolean
  onSelect: (index: number) => void
}

export default function QuizCard({
  question,
  questionNumber,
  selectedAnswer,
  isAnswered,
  onSelect,
}: Props) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Question {questionNumber}
        </p>
        <h2 className="text-xl font-bold leading-snug text-foreground">{question.question}</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {question.answers.map((answer, i) => (
          <AnswerOption
            key={i}
            index={i}
            text={answer}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            correctAnswer={question.correct}
            onClick={() => onSelect(i)}
          />
        ))}

        {isAnswered && (
          <FeedbackBox
            isCorrect={selectedAnswer === question.correct}
            explanation={question.explanation}
          />
        )}
      </CardContent>
    </Card>
  )
}
