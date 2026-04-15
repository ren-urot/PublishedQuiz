import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

interface Props {
  index: number
  text: string
  selectedAnswer: number | null
  isAnswered: boolean
  correctAnswer: number
  onClick: () => void
}

export default function AnswerOption({
  index,
  text,
  selectedAnswer,
  isAnswered,
  correctAnswer,
  onClick,
}: Props) {
  const isSelected = selectedAnswer === index
  const isCorrect = index === correctAnswer
  const isIncorrect = isSelected && !isCorrect
  const isDimmed = isAnswered && !isSelected && !isCorrect

  return (
    <button
      onClick={onClick}
      disabled={isAnswered}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl border-[1.5px] px-4 py-2.5 text-left',
        'transition-all duration-200 hover:shadow-[0_0_14px_4px_rgba(17,130,227,0.22)] active:scale-[0.99]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        'disabled:cursor-default',
        !isAnswered && 'border-border bg-card hover:border-[#2D7BFB] hover:bg-[#2D7BFB]/5',
        isAnswered && isCorrect && 'border-green-500 bg-green-50',
        isAnswered && isIncorrect && 'border-red-500 bg-red-50',
        isDimmed && 'border-border bg-card opacity-50',
      )}
    >
      <span
        className={cn(
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200',
          !isAnswered && 'bg-secondary text-primary',
          isAnswered && isCorrect && 'bg-green-500 text-white animate-pop',
          isAnswered && isIncorrect && 'bg-red-500 text-white animate-shake',
          isDimmed && 'bg-secondary text-muted-foreground',
        )}
      >
        {LETTERS[index]}
      </span>
      <span
        className={cn(
          'text-sm font-medium leading-snug',
          isDimmed ? 'text-muted-foreground' : 'text-foreground',
        )}
      >
        {text}
      </span>
    </button>
  )
}
