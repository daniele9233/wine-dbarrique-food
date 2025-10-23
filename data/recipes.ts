// data/recipes.ts
// Ricette di cucina con abbinamenti vini

export interface Recipe {
  id: string;
  name: string;
  category: 'antipasto' | 'primo' | 'secondo' | 'dessert';
  preparationTime: number; // minuti
  difficulty: 'facile' | 'media' | 'difficile';
  ingredients: string[];
  steps: string[];
  winepairing: string; // Nome del vino consigliato
  winepairingType: 'red' | 'white' | 'rosé' | 'sparkling';
  image?: string;
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Risotto al Barolo',
    category: 'primo',
    preparationTime: 45,
    difficulty: 'media',
    ingredients: [
      '320g riso Carnaroli',
      '1 bottiglia Barolo',
      '1 cipolla',
      'Brodo vegetale',
      '80g burro',
      '100g Parmigiano Reggiano',
      'Sale e pepe',
    ],
    steps: [
      'Soffriggere la cipolla tritata finemente nel burro',
      'Aggiungere il riso e tostarlo per 2 minuti',
      'Sfumare con mezzo bicchiere di Barolo',
      'Cuocere aggiungendo il brodo caldo un mestolo alla volta',
      'A metà cottura aggiungere altro Barolo',
      'Mantecare con burro e Parmigiano',
      'Servire con un filo di Barolo crudo',
    ],
    winepairing: 'Barolo DOCG',
    winepairingType: 'red',
  },
  {
    id: '2',
    name: 'Brasato al Amarone',
    category: 'secondo',
    preparationTime: 180,
    difficulty: 'media',
    ingredients: [
      '1kg polpa di manzo',
      '1 bottiglia Amarone',
      '2 carote',
      '2 cipolle',
      '2 coste sedano',
      'Rosmarino e alloro',
      'Olio EVO',
      'Sale e pepe',
    ],
    steps: [
      'Marinare la carne nell\'Amarone con le verdure per 12 ore',
      'Rosolare la carne in una casseruola',
      'Aggiungere le verdure della marinata',
      'Bagnare con l\'Amarone della marinata',
      'Cuocere in forno a 160°C per 3 ore',
      'Filtrare il sugo e ridurlo sul fuoco',
      'Affettare la carne e servire con il sugo',
    ],
    winepairing: 'Amarone della Valpolicella',
    winepairingType: 'red',
  },
  {
    id: '3',
    name: 'Spaghetti alle Vongole',
    category: 'primo',
    preparationTime: 30,
    difficulty: 'facile',
    ingredients: [
      '400g spaghetti',
      '1kg vongole veraci',
      '3 spicchi aglio',
      'Prezzemolo fresco',
      'Peperoncino',
      'Vino bianco secco',
      'Olio EVO',
    ],
    steps: [
      'Far spurgare le vongole in acqua salata',
      'Soffriggere aglio e peperoncino nell\'olio',
      'Aggiungere le vongole e sfumare col vino bianco',
      'Coprire finché le vongole si aprono',
      'Cuocere gli spaghetti al dente',
      'Saltare la pasta con le vongole',
      'Completare con prezzemolo fresco',
    ],
    winepairing: 'Vermentino di Gallura',
    winepairingType: 'white',
  },
  {
    id: '4',
    name: 'Tiramisù Classico',
    category: 'dessert',
    preparationTime: 30,
    difficulty: 'facile',
    ingredients: [
      '500g mascarpone',
      '4 uova',
      '100g zucchero',
      '300g savoiardi',
      'Caffè espresso',
      'Cacao amaro',
      'Marsala (opzionale)',
    ],
    steps: [
      'Separare tuorli e albumi',
      'Montare i tuorli con lo zucchero',
      'Incorporare il mascarpone ai tuorli',
      'Montare gli albumi a neve e aggiungerli',
      'Bagnare i savoiardi nel caffè',
      'Alternare strati di savoiardi e crema',
      'Spolverare con cacao e riposare 4 ore in frigo',
    ],
    winepairing: 'Moscato d\'Asti',
    winepairingType: 'white',
  },
];