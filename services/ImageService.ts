// services/ImageService.ts
// AGGIORNATO per Expo SDK 54 - usa legacy FileSystem API

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system/legacy';

export const ImageService = {
  // Richiedi permessi fotocamera/galleria
  async requestPermissions(): Promise<boolean> {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return cameraStatus === 'granted' && mediaStatus === 'granted';
  },

  // Scegli immagine dalla galleria
  async pickImage(): Promise<string | null> {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // FIX: usa array invece di MediaTypeOptions
        allowsEditing: true,
        aspect: [3, 4], // Formato bottiglia vino
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // Resize immagine per risparmiare spazio
        return await this.resizeImage(result.assets[0].uri);
      }
      return null;
    } catch (error) {
      console.error('Errore selezione immagine:', error);
      return null;
    }
  },

  // Scatta foto con fotocamera
  async takePhoto(): Promise<string | null> {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        return await this.resizeImage(result.assets[0].uri);
      }
      return null;
    } catch (error) {
      console.error('Errore scatto foto:', error);
      return null;
    }
  },

  // Resize immagine a dimensioni ottimali
  async resizeImage(uri: string): Promise<string> {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [
          { resize: { width: 600 } }, // Larghezza massima 600px (mantiene proporzioni)
        ],
        {
          compress: 0.7, // Compressione 70%
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      
      // Salva in locale permanentemente
      return await this.saveImagePermanently(manipResult.uri);
    } catch (error) {
      console.error('Errore resize immagine:', error);
      return uri; // Ritorna URI originale se resize fallisce
    }
  },

  // Salva immagine in cartella permanente dell'app
  async saveImagePermanently(uri: string): Promise<string> {
    try {
      const filename = `wine_${Date.now()}.jpg`;
      const directory = `${FileSystem.documentDirectory}wine_images/`;
      
      // Crea directory se non esiste
      const dirInfo = await FileSystem.getInfoAsync(directory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      }

      const newPath = directory + filename;
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      });

      return newPath;
    } catch (error) {
      console.error('Errore salvataggio immagine:', error);
      return uri;
    }
  },

  // Elimina immagine
  async deleteImage(uri: string): Promise<boolean> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(uri);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Errore eliminazione immagine:', error);
      return false;
    }
  },
};