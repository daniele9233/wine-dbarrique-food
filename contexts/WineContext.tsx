// contexts/WineContext.tsx
// Context React per gestire lo stato globale della collezione vini

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Wine } from '../data/wines';
import { wines as sampleWines } from '../data/wines';
import { StorageService } from '../services/StorageService';

interface WineContextType {
  wines: Wine[];
  loading: boolean;
  refreshWines: () => Promise<void>;
  addWine: (wine: Wine) => Promise<boolean>;
  updateWine: (wine: Wine) => Promise<boolean>;
  deleteWine: (wineId: string) => Promise<boolean>;
  getWineById: (wineId: string) => Wine | undefined;
}

const WineContext = createContext<WineContextType | undefined>(undefined);

interface WineProviderProps {
  children: ReactNode;
}

export const WineProvider: React.FC<WineProviderProps> = ({ children }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);

  // Carica vini all'avvio
  useEffect(() => {
    loadWines();
  }, []);

  const loadWines = async () => {
    try {
      setLoading(true);
      // Inizializza con dati di esempio se è la prima volta
      await StorageService.initializeWithSampleData(sampleWines);
      // Carica i vini
      const loadedWines = await StorageService.loadWines();
      setWines(loadedWines);
    } catch (error) {
      console.error('Errore caricamento vini:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshWines = async () => {
    await loadWines();
  };

  const addWine = async (wine: Wine): Promise<boolean> => {
    const success = await StorageService.addWine(wine);
    if (success) {
      await refreshWines();
    }
    return success;
  };

  const updateWine = async (wine: Wine): Promise<boolean> => {
    const success = await StorageService.updateWine(wine);
    if (success) {
      await refreshWines();
    }
    return success;
  };

  const deleteWine = async (wineId: string): Promise<boolean> => {
    const success = await StorageService.deleteWine(wineId);
    if (success) {
      await refreshWines();
    }
    return success;
  };

  const getWineById = (wineId: string): Wine | undefined => {
    return wines.find(w => w.id === wineId);
  };

  return (
    <WineContext.Provider
      value={{
        wines,
        loading,
        refreshWines,
        addWine,
        updateWine,
        deleteWine,
        getWineById,
      }}
    >
      {children}
    </WineContext.Provider>
  );
};

// Hook personalizzato per usare il context
export const useWines = (): WineContextType => {
  const context = useContext(WineContext);
  if (!context) {
    throw new Error('useWines deve essere usato dentro WineProvider');
  }
  return context;
};