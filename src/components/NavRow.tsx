import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  onPrev: () => void
  onNext: () => void
  isFirst: boolean
  isLast: boolean
  isAnswered: boolean
}

export default function NavRow({ onPrev, onNext, isFirst, isLast, isAnswered }: Props) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onPrev} disabled={isFirst} className="gap-1">
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <Button onClick={onNext} disabled={!isAnswered} className="gap-1">
        {isLast ? 'Submit' : 'Next'}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
