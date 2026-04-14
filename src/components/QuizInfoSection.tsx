import { ExternalLink, Hash, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Props {
  title: string
  contentUrl: string
  accreditationCode: string
  cpdPoints: number
}

export default function QuizInfoSection({ title, contentUrl, accreditationCode, cpdPoints }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 text-center animate-slide-down">
      <h1 className="text-xl font-bold text-foreground leading-snug max-w-lg">
        {title}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Content link — only shown if URL provided */}
        {contentUrl && (
          <Button variant="outline" size="sm" asChild className="gap-1.5 text-primary border-primary/30 hover:bg-primary/5">
            <a href={contentUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-3.5" />
              View Content
            </a>
          </Button>
        )}

        {/* Accreditation code */}
        <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs font-semibold">
          <Hash className="size-3" />
          {accreditationCode}
        </Badge>

        {/* CPD points */}
        <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs font-semibold text-primary">
          <Award className="size-3" />
          {cpdPoints} CPD {cpdPoints === 1 ? 'Point' : 'Points'}
        </Badge>
      </div>
    </div>
  )
}
