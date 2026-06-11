import Link from "next/link";

export default function CreditsPage() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-game-bg text-game-text p-8 text-center space-y-8 overflow-hidden">
      <div className="shrink-0">
        <h1 className="text-4xl font-bold uppercase text-game-accent mb-4">Créditos</h1>
        <p className="text-game-muted uppercase tracking-widest text-sm">Proyecto de Título</p>
      </div>
      
      <div className="space-y-2 shrink-0">
        <p className="text-game-muted">Desarrollado por:</p>
        <p className="text-2xl font-semibold text-game-accent italic">[Tu Nombre]</p>
      </div>

      <Link 
        href="/" 
        className="text-sm uppercase tracking-tighter text-game-muted hover:text-game-accent transition-colors underline underline-offset-4 shrink-0"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
