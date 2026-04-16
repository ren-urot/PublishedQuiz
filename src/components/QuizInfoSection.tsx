import { useState } from 'react'
import { FileText, X } from 'lucide-react'
import type { ContentType } from './ContentUploadPage'

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  transcripts: 'Transcripts',
  presentation: 'Presentation',
  written: 'Written Materials',
}

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function todayDisplay() {
  return new Date().toLocaleDateString('en-AU', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

interface Props {
  title: string
  contentType: ContentType
  contentUrl: string
  isPdf?: boolean
  noData?: boolean
  accreditationCode: string
  cpdPoints: string
  activityDate?: string
  passingMark?: number
}

export default function QuizInfoSection({
  title,
  contentType,
  contentUrl,
  isPdf: isPdfProp,
  noData,
  accreditationCode,
  cpdPoints,
  activityDate,
  passingMark = 75,
}: Props) {
  const [showViewer, setShowViewer] = useState(false)
  const isPdf = isPdfProp !== undefined ? isPdfProp : contentUrl.toLowerCase().endsWith('.pdf')

  const assessmentDate = todayDisplay()
  const activityDateDisplay = activityDate ? formatDisplayDate(activityDate) : assessmentDate

  const metadata = [
    { label: 'Assessment Number', value: accreditationCode },
    { label: 'Total CPD Points', value: cpdPoints },
    { label: 'Assessment Date', value: assessmentDate },
    { label: 'Activity Date', value: activityDateDisplay },
    { label: 'Passing Mark', value: `${passingMark}%` },
  ]

  return (
    <>
      <div className="rounded-xl border bg-white px-5 py-4 mb-[30px] animate-slide-down">
        {/* Top row: title + content type left, View Content right */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <h1 className="text-[20px] font-semibold leading-snug text-foreground">{title}</h1>
            <p className="text-[16px] font-medium text-accent">{CONTENT_TYPE_LABELS[contentType]}</p>
          </div>

          <button
            onClick={() => { if (!noData && contentUrl) setShowViewer(true) }}
            disabled={noData || !contentUrl}
            className="flex items-center gap-2.5 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="text-[13px] font-semibold text-foreground">View Content</span>
            <div className="flex size-10 items-center justify-center rounded-full bg-accent shadow-sm">
              <FileText className="size-4 text-white" strokeWidth={2} />
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-border" />

        {/* Metadata row */}
        <div className="flex justify-between gap-y-3">
          {metadata.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-[14px] text-muted-foreground">{label}</span>
              <span className="text-[14px] font-medium text-primary">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content viewer modal */}
      {showViewer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowViewer(false)}
        >
          <div
            className="relative flex h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-5 py-3.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileText className="size-4 text-primary" />
                {isPdf ? 'Course Content' : contentUrl.replace(/^https?:\/\//, '')}
              </div>
              <button
                onClick={() => setShowViewer(false)}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <iframe
              src={contentUrl}
              className="flex-1 rounded-b-2xl"
              title="Course Content"
            />
          </div>
        </div>
      )}
    </>
  )
}
