import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  isCorrect: boolean
  explanation: string
}

export default function FeedbackBox({ isCorrect, explanation }: Props) {
  return (
    <div
      className={cn(
        'animate-slide-down',
        'flex gap-3 rounded-lg border p-4',
        isCorrect
          ? 'border-green-500 bg-green-50 text-green-900'
          : 'border-red-500 bg-red-50 text-red-900',
      )}
    >
      {isCorrect ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
      )}
      <p className="text-sm font-medium leading-relaxed">{explanation}</p>
    </div>
  )
}
