export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-3xl flex h-14 items-center px-4 sm:px-6">
        <a href="/" className="flex items-center" aria-label="CPDcheck home">
          <img src="/logo.png" alt="CPDcheck" width={102} height={17} />
        </a>
      </div>
    </header>
  )
}
