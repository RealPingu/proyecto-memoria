import Link from "next/link";

export default function SurveyIntroPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-6 md:p-12 overflow-hidden items-center justify-center">
      <div className="flex flex-col h-full max-w-2xl w-full mx-auto space-y-12 items-center justify-center">
        
        <header className="text-center space-y-4 shrink-0">
          <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
            Perfilado Inicial
          </h1>
          <p className="text-game-muted uppercase tracking-widest text-xs md:text-sm max-w-md mx-auto">
            Antes de comenzar la experiencia, necesitamos conocer tu relación con las interfaces digitales.
          </p>
        </header>

        <main className="space-y-6 text-center shrink-0">
          <div className="bg-game-surface/30 p-8 border border-game-muted/20 rounded-sm">
            <p className="leading-relaxed text-zinc-300 italic">
              "Este cuestionario breve nos ayudará a entender tu punto de partida. No hay respuestas correctas, solo tu percepción personal."
            </p>
          </div>
          
          <p className="text-game-muted text-sm uppercase tracking-widest">
            Tiempo estimado: 2 minutos
          </p>
        </main>

        <nav className="flex flex-col w-full max-w-xs space-y-4 shrink-0">
          <Link 
            href="/survey" 
            className="flex items-center justify-center h-14 w-full bg-game-accent text-game-bg font-bold uppercase tracking-widest transition-all hover:bg-game-text active:scale-95 text-center"
          >
            Comenzar Cuestionario
          </Link>

          <Link 
            href="/onboarding" 
            className="flex items-center justify-center h-14 w-full border border-zinc-700 text-game-muted font-bold uppercase tracking-widest transition-all hover:bg-game-surface hover:text-game-accent active:scale-95 text-center"
          >
            Atrás
          </Link>
        </nav>

      </div>
    </div>
  );
}
