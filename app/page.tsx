import InitializePlayer from "@/app/components/InitializePlayer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-game-bg text-game-text p-8 overflow-hidden">
      <InitializePlayer />

      <main className="flex flex-col items-center max-w-2xl w-full space-y-12 shrink-0">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter text-game-accent uppercase italic">
            Antipatron
          </h1>
          <p className="text-game-muted text-lg tracking-wide uppercase">
            Una experiencia narrativa web
          </p>
        </header>

        <nav className="flex flex-col w-full max-w-xs space-y-4">
          <Link 
            href="/onboarding" 
            className="group relative flex items-center justify-center h-14 w-full bg-game-accent text-game-bg font-bold uppercase tracking-widest transition-all hover:bg-game-text active:scale-95 text-center"
          >
            Comenzar
          </Link>

          <Link 
            href="/credits" 
            className="group relative flex items-center justify-center h-14 w-full border border-zinc-700 text-game-muted font-bold uppercase tracking-widest transition-all hover:bg-game-surface hover:text-game-accent active:scale-95 text-center"
          >
            Créditos
          </Link>
        </nav>

        <footer className="pt-12">
          <p className="text-game-muted/50 text-sm font-mono italic">
            Proyecto de Título © 2026
          </p>
        </footer>
      </main>
    </div>
  );
}
