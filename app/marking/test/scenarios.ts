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
    },
    {
        id: 'sn_04',
        title: 'Costos Ocultos - Seguro',
        context: 'Tu objetivo es comprar el saco de dormir y el kit de supervivencia. Evita cargos adicionales no deseados.',
        mockupUrl: '/assets/mockups/hidden_costs_2.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_hc2_1', label: 'Sneaking > Hiding Information > Hidden Costs', isCorrect: true },
            { id: 'opt_hc2_2', label: 'Sneaking > Hiding Information > Sneak into Basket', isCorrect: true },
            { id: 'opt_hc2_3', label: 'Sneaking > Bait and Switch > Disguised Ads', isCorrect: false },
            { id: 'opt_hc2_none', label: 'No lo sé / No recuerdo', isCorrect: false }
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
    },
    {
        id: 'sn_05',
        title: 'Comparación - Unidades',
        context: 'Tu objetivo es elegir el plan de acceso al gimnasio que consideres más conveniente. Evita trucos de tarifas.',
        mockupUrl: '/assets/mockups/comparison_prevention_1.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_cp1_1', label: 'Sneaking > Hiding Information > Comparison Prevention', isCorrect: true },
            { id: 'opt_cp1_2', label: 'Sneaking > Hiding Information > Hidden Costs', isCorrect: false },
            { id: 'opt_cp1_3', label: 'Urgency > Scarcity > Low Stock Message', isCorrect: false },
            { id: 'opt_cp1_none', label: 'No lo sé / No recuerdo', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 8.77,
                "xMax": 61.74,
                "yMin": 30.82,
                "yMax": 33.86,
                "label": ":Lenguaje excluyente 1"
            },
            {
                "xMin": 8.77,
                "xMax": 62.84,
                "yMin": 51.97,
                "yMax": 57.64,
                "label": "Lenguaje excluyente 2"
            },
            {
                "xMin": 67.23,
                "xMax": 95.5,
                "yMin": 38.98,
                "yMax": 59.58,
                "label": "Plan semanal resaltado"
            },
            {
                "xMin": 8.77,
                "xMax": 63.66,
                "yMin": 76.58,
                "yMax": 79.49,
                "label": "hidden cost"
            }
        ]
    },
    {
        id: 'sn_06',
        title: 'Comparación - Cebo',
        context: 'Tu objetivo es elegir la suscripción de streaming de video más conveniente para ti. Identifica trucos de comparación.',
        mockupUrl: '/assets/mockups/comparison_prevention_2.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_cp2_1', label: 'Sneaking > Hiding Information > Comparison Prevention', isCorrect: true },
            { id: 'opt_cp2_2', label: 'Sneaking > Hiding Information > Hidden Costs', isCorrect: false },
            { id: 'opt_cp2_3', label: 'Urgency > Scarcity > Low Stock Message', isCorrect: false },
            { id: 'opt_cp2_none', label: 'No lo sé / No recuerdo', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 8.49,
                "xMax": 60.37,
                "yMin": 42.3,
                "yMax": 45.89,
                "label": "Periodos no claros 1"
            },
            {
                "xMin": 8.77,
                "xMax": 60.09,
                "yMin": 64.55,
                "yMax": 67.46,
                "label": "Periodos no claros 2"
            },
            {
                "xMin": 9.32,
                "xMax": 60.09,
                "yMin": 71.74,
                "yMax": 79.76,
                "label": "Lenguaje confuso 2"
            },
            {
                "xMin": 8.77,
                "xMax": 57.62,
                "yMin": 49.62,
                "yMax": 57.5,
                "label": "Lenguaje confuso 2"
            },
            {
                "xMin": 76.01,
                "xMax": 86.99,
                "yMin": 50.73,
                "yMax": 53.08,
                "label": "peiodo confuso"
            },
            {
                "xMin": 8.22,
                "xMax": 57.35,
                "yMin": 27.37,
                "yMax": 35.8,
                "label": "Elementos no explicados"
            },
            {
                "xMin": 9.04,
                "xMax": 54.61,
                "yMin": 23.36,
                "yMax": 26.26,
                "label": "Subtitulo llamativo 1"
            },
            {
                "xMin": 9.04,
                "xMax": 57.08,
                "yMin": 45.61,
                "yMax": 47.69,
                "label": "Subtitulo con lenguaje diverso 2"
            },
            {
                "xMin": 9.04,
                "xMax": 50.49,
                "yMin": 67.87,
                "yMax": 69.67,
                "label": "subtitulo 3 cambio de lenguaje."
            }
        ]
    }
];
