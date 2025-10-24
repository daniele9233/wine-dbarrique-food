// components/ImagePickerComponent.tsx
// Componente per upload foto vino

import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { ImageService } from '../services/ImageService';

interface ImagePickerComponentProps {
  imageUri?: string;
  onImageSelected: (uri: string) => void;
}

export default function ImagePickerComponent({ imageUri, onImageSelected }: ImagePickerComponentProps) {
  const [localImageUri, setLocalImageUri] = useState<string | undefined>(imageUri);

  const handlePickImage = async () => {
    // Richiedi permessi
    const hasPermission = await ImageService.requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permessi necessari',
        'L\'app ha bisogno dei permessi per accedere alla fotocamera e galleria.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Mostra opzioni
    Alert.alert(
      'Scegli immagine',
      'Come vuoi aggiungere la foto del vino?',
      [
        {
          text: 'Fotocamera',
          onPress: async () => {
            const uri = await ImageService.takePhoto();
            if (uri) {
              setLocalImageUri(uri);
              onImageSelected(uri);
            }
          },
        },
        {
          text: 'Galleria',
          onPress: async () => {
            const uri = await ImageService.pickImage();
            if (uri) {
              setLocalImageUri(uri);
              onImageSelected(uri);
            }
          },
        },
        {
          text: 'Annulla',
          style: 'cancel',
        },
      ]
    );
  };

  const handleRemoveImage = () => {
    Alert.alert(
      'Rimuovi immagine',
      'Sei sicuro di voler rimuovere questa immagine?',
      [
        {
          text: 'Annulla',
          style: 'cancel',
        },
        {
          text: 'Rimuovi',
          style: 'destructive',
          onPress: () => {
            setLocalImageUri(undefined);
            onImageSelected('');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foto Bottiglia</Text>
      
      {localImageUri ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: localImageUri }} style={styles.image} />
          <View style={styles.imageActions}>
            <TouchableOpacity style={styles.imageActionButton} onPress={handlePickImage}>
              <MaterialIcons name="edit" size={20} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.imageActionButton, styles.deleteButton]} 
              onPress={handleRemoveImage}
            >
              <MaterialIcons name="delete" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.placeholder} onPress={handlePickImage}>
          <MaterialIcons name="add-a-photo" size={48} color={Colors.textMuted} />
          <Text style={styles.placeholderText}>Aggiungi foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  imageActions: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 8,
  },
  imageActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: Colors.error,
  },
  placeholder: {
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textMuted,
  },
});