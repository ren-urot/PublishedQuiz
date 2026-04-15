import { useState, useRef } from 'react'
import { UploadCloud, FileCheck2, FileVideo, FileEdit, ArrowRight, Calendar, ChevronDown, FileText, X } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'

type Tab = 'pdf' | 'text' | 'url'
export type ContentType = 'transcripts' | 'presentation' | 'written'
export interface ContentData {
  inputType: Tab
  file?: File
  text?: string
  url?: string
  date?: string
}

interface Props {
  onAssess: (contentType: ContentType, data: ContentData) => void
}

const CONTENT_TYPES = [
  {
    id: 'transcripts' as ContentType,
    title: 'Transcripts',
    description: 'From recorded meetings, webinars, videos, podcasts etc',
    icon: FileCheck2,
  },
  {
    id: 'presentation' as ContentType,
    title: 'Presentation',
    description: 'Conference talks or training where no transcript is available',
    icon: FileVideo,
  },
  {
    id: 'written' as ContentType,
    title: 'Written Materials',
    description: 'Articles, research, white papers, emails, online courses',
    icon: FileEdit,
  },
]

function formatDate(d: string) {
  if (!d) return null
  const [y, m, day] = d.split('-')
  return new Date(+y, +m - 1, +day).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function formatBytes(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function ContentUploadPage({ onAssess }: Props) {
  const [tab, setTab] = useState<Tab>('pdf')
  const [selected, setSelected] = useState<ContentType>('transcripts')
  const [duration, setDuration] = useState('')
  const [date, setDate] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) setFile(f)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex justify-center p-4 pt-6 sm:p-8 sm:pt-10">
        <div className="w-full max-w-2xl animate-slide-down">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">

            {/* Tabs */}
            <div className="mb-5 flex w-fit gap-0.5 rounded-lg border bg-muted p-1">
              {(['pdf', 'text', 'url'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-150',
                    tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t === 'pdf' ? 'Upload PDF' : t === 'text' ? 'Paste Text' : 'URL'}
                </button>
              ))}
            </div>

            {/* PDF upload */}
            {tab === 'pdf' && (
              file ? (
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <FileText className="size-8 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    'mb-4 flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition-all duration-150',
                    isDragging
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border bg-muted/50 hover:border-primary/30 hover:bg-muted/70',
                  )}
                >
                  <UploadCloud
                    className={cn('size-12 transition-colors', isDragging ? 'text-primary' : 'text-foreground/50')}
                    strokeWidth={1.5}
                  />
                  <p className="text-sm text-muted-foreground">
                    {isDragging ? 'Drop file here' : 'PDF format, up to 10 MB'}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                    className="rounded-xl border bg-card px-5 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted/60"
                  >
                    Browse File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )
            )}

            {/* Paste Text */}
            {tab === 'text' && (
              <div className="relative mb-4">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text content here..."
                  className="h-44 w-full resize-none rounded-xl border bg-muted/30 p-4 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                />
                {text && (
                  <button
                    onClick={() => setText('')}
                    className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
                <p className="mt-1 text-right text-xs text-muted-foreground">{text.length} characters</p>
              </div>
            )}

            {/* URL */}
            {tab === 'url' && (
              <div className="relative mb-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://"
                  className="w-full rounded-xl border bg-muted/30 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                />
                {url && (
                  <button
                    onClick={() => setUrl('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Content type list */}
            <div className="mb-6 flex flex-col gap-2">
              {CONTENT_TYPES.map(({ id, title, description, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={cn(
                    'flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-150',
                    selected === id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30',
                  )}
                >
                  <Icon
                    className={cn('size-5 shrink-0 transition-colors', selected === id ? 'text-primary' : 'text-muted-foreground')}
                  />
                  <div>
                    <p className={cn('text-sm font-semibold', selected === id ? 'text-primary' : 'text-foreground')}>
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {/* Date of Activity */}
                <div className="relative">
                  <button className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50">
                    <Calendar className="size-3.5" />
                    {date ? formatDate(date) : 'Date of Activity'}
                    <ChevronDown className="size-3.5" />
                  </button>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-sm">
                  <input
                    type="number"
                    min={1}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="___"
                    className="w-14 rounded-md border bg-transparent px-2 py-1.5 text-center text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                  />
                  <span className="text-muted-foreground">mins</span>
                  <span className="font-medium text-foreground">Duration</span>
                </div>
              </div>

              {/* Assess button */}
              <button
                onClick={() => onAssess(selected, { inputType: tab, file: file ?? undefined, text, url, date })}
                className="flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-sm transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              >
                Assess
                <ArrowRight className="size-4" />
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
