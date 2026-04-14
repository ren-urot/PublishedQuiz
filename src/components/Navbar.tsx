import cpdLogo from '@/assets/logo.png'
import macleanLogo from '@/assets/maclean-logo.png'

interface Props {
  variant?: 'cpd' | 'maclean'
}

export default function Navbar({ variant = 'cpd' }: Props) {
  const src = variant === 'maclean' ? macleanLogo : cpdLogo
  const alt = variant === 'maclean' ? 'Maclean Financial' : 'CPDcheck'

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-3xl flex h-14 items-center px-4 sm:px-6">
        <a href="/" className="flex items-center" aria-label={alt}>
          {variant === 'maclean'
            ? <img src={src} alt={alt} className="h-9 w-auto" />
            : <img src={src} alt={alt} width={102} height={17} />
          }
        </a>
      </div>
    </header>
  )
}
