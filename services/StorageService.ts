// services/StorageService.ts
// Servizio per gestione storage locale persistente

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wine } from '../data/wines';

const STORAGE_KEYS = {
  WINES: '@dbarrique_wines',
  SETTINGS: '@dbarrique_settings',
};

// Servizio per gestire il salvataggio/caricamento vini
export const StorageService = {
  // Salva l'intera collezione vini
  async saveWines(wines: Wine[]): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(wines);
      await AsyncStorage.setItem(STORAGE_KEYS.WINES, jsonValue);
      return true;
    } catch (error) {
      console.error('Errore nel salvataggio vini:', error);
      return false;
    }
  },

  // Carica tutti i vini salvati
  async loadWines(): Promise<Wine[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.WINES);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      }
      return []; // Nessun vino salvato
    } catch (error) {
      console.error('Errore nel caricamento vini:', error);
      return [];
    }
  },

  // Aggiungi un nuovo vino
  async addWine(wine: Wine): Promise<boolean> {
    try {
      const wines = await this.loadWines();
      wines.push(wine);
      return await this.saveWines(wines);
    } catch (error) {
      console.error('Errore nell\'aggiunta vino:', error);
      return false;
    }
  },

  // Aggiorna un vino esistente
  async updateWine(updatedWine: Wine): Promise<boolean> {
    try {
      const wines = await this.loadWines();
      const index = wines.findIndex(w => w.id === updatedWine.id);
      if (index !== -1) {
        wines[index] = updatedWine;
        return await this.saveWines(wines);
      }
      return false;
    } catch (error) {
      console.error('Errore nell\'aggiornamento vino:', error);
      return false;
    }
  },

  // Elimina un vino
  async deleteWine(wineId: string): Promise<boolean> {
    try {
      const wines = await this.loadWines();
      const filteredWines = wines.filter(w => w.id !== wineId);
      return await this.saveWines(filteredWines);
    } catch (error) {
      console.error('Errore nell\'eliminazione vino:', error);
      return false;
    }
  },

  // Ottieni un singolo vino per ID
  async getWineById(wineId: string): Promise<Wine | null> {
    try {
      const wines = await this.loadWines();
      return wines.find(w => w.id === wineId) || null;
    } catch (error) {
      console.error('Errore nel recupero vino:', error);
      return null;
    }
  },

  // Cancella tutto (reset app)
  async clearAll(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.WINES);
      return true;
    } catch (error) {
      console.error('Errore nella cancellazione dati:', error);
      return false;
    }
  },

  // Inizializza con dati di esempio (prima volta)
  async initializeWithSampleData(sampleWines: Wine[]): Promise<boolean> {
    try {
      const existingWines = await this.loadWines();
      // Solo se non ci sono vini, carica i dati di esempio
      if (existingWines.length === 0) {
        return await this.saveWines(sampleWines);
      }
      return true;
    } catch (error) {
      console.error('Errore nell\'inizializzazione:', error);
      return false;
    }
  },
};