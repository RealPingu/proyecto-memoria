export default function SurveyPage() {
  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-6 md:p-12 overflow-hidden items-center justify-center">
      <div className="flex flex-col h-full max-w-2xl w-full mx-auto space-y-12 items-center justify-center">
        <header className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
            Cuestionario Likert
          </h1>
          <p className="text-game-muted uppercase tracking-widest text-xs">
            [Espacio para preguntas]
          </p>
        </header>
        
        <main className="text-zinc-500 italic">
          Cargando estructura del cuestionario...
        </main>
      </div>
    </div>
  );
}
