// app/game/marking/test/scenarios.ts

export interface PatternOption {
    id: string;
    label: string; // Ahora será la secuencia completa: "Alto > Medio > Bajo"
    isCorrect: boolean;
}

export interface Scenario {
    id: string;
    title: string;
    context: string;
    mockupUrl: string;
    time: number;
    patternOptions: PatternOption[];
}

export const SCENARIOS: Scenario[] = [
    {
        id: 'sn_01',
        title: 'Compra de Producto',
        context: 'Tu objetivo es comprar el "Smartwatch Pro" de forma directa. No deseas servicios extra ni seguros.',
        mockupUrl: '/assets/mockups/sneaking_01.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_1', label: 'Sneaking > Hiding Information > Sneak into Basket', isCorrect: true },
            { id: 'opt_2', label: 'Sneaking > Hiding Information > Hidden Costs', isCorrect: true },
            { id: 'opt_3', label: 'Sneaking > Bait and Switch > Disguised Ads', isCorrect: false },
            { id: 'opt_4', label: 'Urgency > Scarcity > Low Stock Message', isCorrect: false },
            { id: 'opt_none', label: 'No lo sé / No recuerdo', isCorrect: false }
        ]
    }
];
