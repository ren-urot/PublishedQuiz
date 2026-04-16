import { FileX2, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'

interface Props {
  onBack: () => void
}

export default function NoDataPage({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex items-center justify-center p-4 sm:p-8" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className="flex w-full max-w-md flex-col items-center gap-6 animate-scale-in text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileX2 className="size-9 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground">No Data Available</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transcripts content type is not currently supported for quiz generation.<br />
              Try uploading a <strong>Presentation</strong> or <strong>Written Materials</strong> instead.
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted active:scale-[0.98]"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </button>
        </div>
      </main>
    </div>
  )
}
