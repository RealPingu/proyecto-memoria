import Link from "next/link";

export default function CreditsPage() {
    return (
        <div className="flex flex-col h-screen w-full items-center justify-center bg-game-bg text-game-text p-6 text-center space-y-12 overflow-hidden">
            <div className="shrink-0 space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold uppercase text-game-accent">Créditos</h1>
                <p className="text-game-muted uppercase tracking-widest text-xs md:text-sm">Proyecto de Título</p>
            </div>

            <div className="space-y-2 shrink-0">
                <p className="text-game-muted text-sm md:text-base">Desarrollado por:</p>
                <p className="text-xl md:text-2xl font-semibold text-game-accent italic">Inti Vidal</p>
            </div>

            <Link
                href="/"
                className="text-xs md:text-sm uppercase tracking-tighter text-game-muted hover:text-game-accent transition-colors underline underline-offset-4 shrink-0"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
