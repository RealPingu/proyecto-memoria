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
        context: 'Tu objetivo es descargar un archivo en formato PDF (documento).',
        mockupUrl: '/assets/mockups/disguised_ads_1.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_da_1', label: 'Anuncios Disfrazados', isCorrect: true },
            { id: 'opt_da_2', label: 'Costos Ocultos', isCorrect: false },
            { id: 'opt_da_3', label: 'Colarse en el Carrito', isCorrect: false },
            { id: 'opt_da_none', label: 'No se observan patrones oscuros', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 5.2,
                "xMax": 95.23,
                "yMin": 11.05,
                "yMax": 25.02,
                "label": "Anuncio Disfrazado: Botón de descarga PDF falso"
            },
            {
                "xMin": 4.93,
                "xMax": 94.95,
                "yMin": 27.23,
                "yMax": 46.58,
                "label": "Anuncio Disfrazado: Botón de descarga principal falso"
            },
            {
                "xMin": 6.57,
                "xMax": 92.21,
                "yMin": 59.02,
                "yMax": 93.45,
                "label": "Anuncio Disfrazado: Sección de comentarios patrocinada"
            }
        ]
    },
    {
        id: 'sn_02',
        title: 'Anuncios Disfrazados - Siguiente',
        context: 'Tu objetivo es avanzar a la siguiente sección del artículo.',
        mockupUrl: '/assets/mockups/disguised_ads_2.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_da2_1', label: 'Anuncios Disfrazados', isCorrect: true },
            { id: 'opt_da2_2', label: 'Costos Ocultos', isCorrect: false },
            { id: 'opt_da2_3', label: 'Colarse en el Carrito', isCorrect: false },
            { id: 'opt_da2_none', label: 'No se observan patrones oscuros', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 5.2,
                "xMax": 94.4,
                "yMin": 75.06,
                "yMax": 91.79,
                "label": "Anuncio Disfrazado: Botón 'Siguiente' falso en pie de página"
            }
        ]
    },
    {
        id: 'sn_03',
        title: 'Costos Ocultos - Ticket',
        context: 'Tu objetivo es comprar la entrada por el precio anunciado de 25.000 CLP.',
        mockupUrl: '/assets/mockups/hidden_costs_1.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_hc_1', label: 'Costos Ocultos', isCorrect: true },
            { id: 'opt_hc_2', label: 'Anuncios Disfrazados', isCorrect: false },
            { id: 'opt_hc_3', label: 'Colarse en el Carrito', isCorrect: false },
            { id: 'opt_hc_none', label: 'No se observan patrones oscuros', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 8.22,
                "xMax": 94.13,
                "yMin": 54.88,
                "yMax": 61.65,
                "label": "Cargos de procesamiento en gris (Costo oculto)"
            },
            {
                "xMin": 9.87,
                "xMax": 90.84,
                "yMin": 70.08,
                "yMax": 75.06,
                "label": "Cláusula restrictiva de no reembolso en letra pequeña"
            },
            {
                "xMin": 5.2,
                "xMax": 92.21,
                "yMin": 79.49,
                "yMax": 84.19,
                "label": "Dificultad de acceso a los Términos de Servicio"
            }
        ]
    },
    {
        id: 'sn_04',
        title: 'Costos Ocultos - Seguro',
        context: 'Tu objetivo es comprar el kit de supervivencia y el saco de dormir impermeable.',
        mockupUrl: '/assets/mockups/hidden_costs_2.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_hc2_1', label: 'Costos Ocultos', isCorrect: true },
            { id: 'opt_hc2_2', label: 'Colarse en el Carrito', isCorrect: true },
            { id: 'opt_hc2_3', label: 'Anuncios Disfrazados', isCorrect: false },
            { id: 'opt_hc2_none', label: 'No se observan patrones oscuros', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 6.02,
                "xMax": 94.4,
                "yMin": 45.2,
                "yMax": 54.46,
                "label": "Costo adicional preseleccionado (Seguro)"
            },
            {
                "xMin": 5.47,
                "xMax": 95.23,
                "yMin": 61.79,
                "yMax": 64.55,
                "label": "Item de seguro agregado en desglose de costos"
            }
        ]
    },
    {
        id: 'sn_05',
        title: 'Comparación - Unidades',
        context: 'Tu objetivo es elegir el plan de gimnasio más conveniente.',
        mockupUrl: '/assets/mockups/comparison_prevention_1.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_cp1_1', label: 'Prevención de Comparación', isCorrect: true },
            { id: 'opt_cp1_2', label: 'Costos Ocultos', isCorrect: false },
            { id: 'opt_cp1_3', label: 'Anuncios Disfrazados', isCorrect: false },
            { id: 'opt_cp1_none', label: 'No se observan patrones oscuros', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 68.8,
                "xMax": 93.8,
                "yMin": 38.8,
                "yMax": 41.3,
                "label": "Badge Recomendado (Cebo de texto)"
            },
            {
                "xMin": 67.5,
                "xMax": 95.0,
                "yMin": 40.0,
                "yMax": 59.4,
                "label": "Precio cebo semanal (Sin totalizar)"
            },
            {
                "xMin": 5.0,
                "xMax": 50.0,
                "yMin": 54.0,
                "yMax": 56.0,
                "label": "Exclusión de piscina en plan cebo"
            },
            {
                "xMin": 5.0,
                "xMax": 57.5,
                "yMin": 75.8,
                "yMax": 77.9,
                "label": "Cobro adicional oculto en Plan Premium"
            }
        ]
    },
    {
        id: 'sn_06',
        title: 'Comparación - Cebo',
        context: 'Tu objetivo es elegir el plan de streaming más conveniente.',
        mockupUrl: '/assets/mockups/comparison_prevention_2.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_cp2_1', label: 'Prevención de Comparación', isCorrect: true },
            { id: 'opt_cp2_2', label: 'Costos Ocultos', isCorrect: false },
            { id: 'opt_cp2_3', label: 'Anuncios Disfrazados', isCorrect: false },
            { id: 'opt_cp2_none', label: 'No se observan patrones oscuros', isCorrect: false }
        ],
        correctAreas: [
            {
                "xMin": 68.8,
                "xMax": 93.8,
                "yMin": 16.9,
                "yMax": 19.4,
                "label": "Badge Recomendado (Cebo superior)"
            },
            {
                "xMin": 67.5,
                "xMax": 95.0,
                "yMin": 18.1,
                "yMax": 37.5,
                "label": "Precio cebo semanal (Premium)"
            },
            {
                "xMin": 45.0,
                "xMax": 59.0,
                "yMin": 43.1,
                "yMax": 45.6,
                "label": "Contradicción: Texto 'Anual' en título"
            },
            {
                "xMin": 67.5,
                "xMax": 95.0,
                "yMin": 51.0,
                "yMax": 54.0,
                "label": "Contradicción: Cobro 'Por mes'"
            },
            {
                "xMin": 5.0,
                "xMax": 55.0,
                "yMin": 31.0,
                "yMax": 33.5,
                "label": "Exclusión de descargas en plan premium cebo"
            },
            {
                "xMin": 5.0,
                "xMax": 95.0,
                "yMin": 84.0,
                "yMax": 86.5,
                "label": "Cargo por cancelación oculta en footer"
            }
        ]
    },
    {
        id: 'sn_07',
        title: 'Portal de Acceso - Control',
        context: 'Tu objetivo es iniciar sesión en una app.',
        mockupUrl: '/assets/mockups/control_1.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_ctrl1_none', label: 'No se observan patrones oscuros', isCorrect: true },
            { id: 'opt_ctrl1_da', label: 'Anuncios Disfrazados', isCorrect: false },
            { id: 'opt_ctrl1_hc', label: 'Costos Ocultos', isCorrect: false },
            { id: 'opt_ctrl1_cp', label: 'Prevención de Comparación', isCorrect: false }
        ],
        correctAreas: []
    },
    {
        id: 'sn_08',
        title: 'Checkout de Compra - Control',
        context: 'Tu objetivo es completar la compra de tus audífonos.',
        mockupUrl: '/assets/mockups/control_2.svg',
        time: 30,
        patternOptions: [
            { id: 'opt_ctrl2_none', label: 'No se observan patrones oscuros', isCorrect: true },
            { id: 'opt_ctrl2_da', label: 'Anuncios Disfrazados', isCorrect: false },
            { id: 'opt_ctrl2_hc', label: 'Costos Ocultos', isCorrect: false },
            { id: 'opt_ctrl2_cp', label: 'Prevención de Comparación', isCorrect: false }
        ],
        correctAreas: []
    }
];
