import { useState } from 'react'
import { ExternalLink, FileText, X, Hash, Award } from 'lucide-react'

interface Props {
  title: string
  contentUrl: string
  isPdf?: boolean
  noData?: boolean
  accreditationCode: string
  cpdPoints: number
}

export default function QuizInfoSection({ title, contentUrl, isPdf: isPdfProp, noData, accreditationCode, cpdPoints }: Props) {
  const [showPdf, setShowPdf] = useState(false)
  const isPdf = isPdfProp !== undefined ? isPdfProp : contentUrl.toLowerCase().endsWith('.pdf')

  return (
    <>
      <div className="flex flex-col gap-2 animate-slide-down">

        {/* View content / No data button — top right */}
        <div className="flex justify-end">
          {noData ? (
            <span className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground opacity-60 cursor-not-allowed select-none">
              <X className="size-4" />
              No Data Available
            </span>
          ) : contentUrl ? (
            <button
              onClick={() => setShowPdf(true)}
              className="flex items-center gap-2 rounded-lg border border-primary/30 bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all duration-200 hover:border-primary/60 hover:bg-primary/5 hover:shadow-md"
            >
              {isPdf ? <FileText className="size-4" /> : <ExternalLink className="size-4" />}
              {isPdf ? 'View PDF' : 'View Content'}
            </button>
          ) : null}
        </div>

        {/* 2 stat cards */}
        <div className="grid grid-cols-2 gap-3">

          {/* Accreditation Code */}
          <div className="flex flex-col items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-center shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Hash className="size-4 text-primary" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Accreditation Code
            </span>
            <span className="text-lg font-bold tabular-nums tracking-wide text-primary">
              {accreditationCode}
            </span>
          </div>

          {/* CPD Points */}
          <div className="flex flex-col items-center gap-1.5 rounded-xl border bg-card px-3 py-2.5 text-center shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Award className="size-4 text-primary" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              CPD {cpdPoints === 1 ? 'Point' : 'Points'}
            </span>
            <span className="text-4xl font-bold leading-none text-primary tabular-nums">
              {cpdPoints}
            </span>
          </div>

        </div>

        {/* Title */}
        <h1 className="mt-[30px] mb-5 text-center text-xl font-bold leading-snug text-foreground">
          {title}
        </h1>
      </div>

      {/* PDF / URL viewer modal */}
      {showPdf && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowPdf(false)}
        >
          <div
            className="relative flex h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-5 py-3.5">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                {isPdf
                  ? <FileText className="size-4 text-primary" />
                  : <ExternalLink className="size-4 text-primary" />
                }
                {isPdf ? 'Course Content' : contentUrl.replace(/^https?:\/\//, '')}
              </div>
              <button
                onClick={() => setShowPdf(false)}
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
