// app/marking/test/scenarios.ts

export interface PatternOption {
    id: string;
    label: string;
    isCorrect: boolean;
}

export interface CorrectArea {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    label: string;
}

export interface Scenario {
    id: string;
    title: string;
    context: string;
    mockupUrl: string;
    time: number;
    patternOptions: PatternOption[];
    correctAreas: CorrectArea[];
}

export const SCENARIOS: Scenario[] = [
    {
        id: 'sn_01',
        title: 'Anuncios Disfrazados - Descarga',
        context: 'Tu objetivo es descargar el manual en PDF de forma gratuita. Evita hacer clic en publicidad.',
        mockupUrl: '/assets/mockups/disguised_ads_1.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_da_1', label: 'Sneaking > Bait and Switch > Disguised Ads', isCorrect: true },
            { id: 'opt_da_2', label: 'Sneaking > Hiding Information > Hidden Costs', isCorrect: false },
            { id: 'opt_da_3', label: 'Sneaking > Hiding Information > Sneak into Basket', isCorrect: false },
            { id: 'opt_da_none', label: 'No lo sé / No recuerdo', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 5.2,
                "xMax": 95.23,
                "yMin": 11.05,
                "yMax": 25.02,
                "label": "ad pdf"
            },
            {
                "xMin": 4.93,
                "xMax": 94.95,
                "yMin": 27.23,
                "yMax": 46.58,
                "label": "Ad descarga"
            },
            {
                "xMin": 6.57,
                "xMax": 92.21,
                "yMin": 59.02,
                "yMax": 93.45,
                "label": "sus comments"
            }
        ]
    },
    {
        id: 'sn_02',
        title: 'Anuncios Disfrazados - Siguiente',
        context: 'Tu objetivo es avanzar a la siguiente sección del artículo presionando el botón de navegación correcto.',
        mockupUrl: '/assets/mockups/disguised_ads_2.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_da2_1', label: 'Sneaking > Bait and Switch > Disguised Ads', isCorrect: true },
            { id: 'opt_da2_2', label: 'Sneaking > Hiding Information > Hidden Costs', isCorrect: false },
            { id: 'opt_da2_3', label: 'Sneaking > Hiding Information > Sneak into Basket', isCorrect: false },
            { id: 'opt_da2_none', label: 'No lo sé / No recuerdo', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 5.2,
                "xMax": 94.4,
                "yMin": 75.06,
                "yMax": 91.79,
                "label": "Ad 1"
            }
        ]
    },
    {
        id: 'sn_03',
        title: 'Costos Ocultos - Ticket',
        context: 'Tu objetivo es comprar el ticket de entrada general por el precio anunciado de 15.000 CLP.',
        mockupUrl: '/assets/mockups/hidden_costs_1.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_hc_1', label: 'Sneaking > Hiding Information > Hidden Costs', isCorrect: true },
            { id: 'opt_hc_2', label: 'Sneaking > Bait and Switch > Disguised Ads', isCorrect: false },
            { id: 'opt_hc_3', label: 'Urgency > Scarcity > Low Stock Message', isCorrect: false },
            { id: 'opt_hc_none', label: 'No lo sé / No recuerdo', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 8.22,
                "xMax": 94.13,
                "yMin": 54.88,
                "yMax": 61.65,
                "label": "Cargos Adicionales en gris"
            },
            {
                "xMin": 9.87,
                "xMax": 90.84,
                "yMin": 70.08,
                "yMax": 75.06,
                "label": "Nota de no reembolso"
            },
            {
                "xMin": 5.2,
                "xMax": 92.21,
                "yMin": 79.49,
                "yMax": 84.19,
                "label": "no easy access to terms of service"
            }
        ]
    }
];
