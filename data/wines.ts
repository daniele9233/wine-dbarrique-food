// data/wines.ts
// Dati di esempio per la collezione vini

export interface Wine {
  id: string;
  name: string;
  producer?: string;
  region: string;
  year: number;
  type: 'red' | 'white' | 'rosé' | 'sparkling';
  rating: number; // 0-10
  image?: string;
  notes?: string;
  grapes?: string[];
}

export const wines: Wine[] = [
  {
    id: '1',
    name: 'Barolo Cannubi',
    producer: 'Marchesi di Barolo',
    region: 'Piemonte',
    year: 2018,
    type: 'red',
    rating: 9.5,
    notes: 'Elegante e potente, con note di rosa, ciliegia e liquirizia. Tannini setosi e lunga persistenza.',
    grapes: ['Nebbiolo'],
  },
  {
    id: '2',
    name: 'Amarone della Valpolicella',
    producer: 'Allegrini',
    region: 'Veneto',
    year: 2015,
    type: 'red',
    rating: 9.0,
    notes: 'Ricco e complesso, con sentori di frutta secca, spezie e cioccolato. Struttura imponente.',
    grapes: ['Corvina', 'Rondinella', 'Molinara'],
  },
  {
    id: '3',
    name: 'Brunello di Montalcino',
    producer: 'Biondi-Santi',
    region: 'Toscana',
    year: 2016,
    type: 'red',
    rating: 9.3,
    notes: 'Raffinato ed equilibrato, con profumi di ciliegia, violetta e tabacco. Eccellente longevità.',
    grapes: ['Sangiovese'],
  },
  {
    id: '4',
    name: 'Gavi di Gavi',
    producer: 'La Scolca',
    region: 'Piemonte',
    year: 2021,
    type: 'white',
    rating: 8.5,
    notes: 'Fresco e minerale, con note di pesca bianca, fiori bianchi e mandorla. Ottima acidità.',
    grapes: ['Cortese'],
  },
  {
    id: '5',
    name: 'Franciacorta Satèn',
    producer: 'Ca\' del Bosco',
    region: 'Lombardia',
    year: 2019,
    type: 'sparkling',
    rating: 8.8,
    notes: 'Cremoso e delicato, con profumi di agrumi, pane tostato e fiori bianchi. Bollicine finissime.',
    grapes: ['Chardonnay'],
  },
];

// Funzione per calcolare statistiche
export const getWineStats = (wineList: Wine[]) => {
  const totalWines = wineList.length;
  const avgRating = wineList.reduce((sum, wine) => sum + wine.rating, 0) / totalWines;
  
  // Conta per tipo
  const typeCount: { [key: string]: number } = {};
  wineList.forEach(wine => {
    typeCount[wine.type] = (typeCount[wine.type] || 0) + 1;
  });
  
  // Trova tipo più comune
  const mostCommonType = Object.keys(typeCount).reduce((a, b) => 
    typeCount[a] > typeCount[b] ? a : b
  );
  
  return {
    totalWines,
    avgRating: avgRating.toFixed(1),
    mostCommonType,
    typeCount,
  };
};