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
          ? 'border-[#749ff6] bg-[#3d79f2]/10 text-[#1a3a7a]'
          : 'border-[#ffba7d] bg-[#ff9f4b]/10 text-[#7a3a00]',
      )}
    >
      {isCorrect ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3d79f2]" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff9f4b]" />
      )}
      <p className="text-sm font-medium leading-relaxed">{explanation}</p>
    </div>
  )
}
