import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Definiamo i tipi per le props (parametri) del bottone
interface CustomButtonProps {
  title: string;              // Testo del bottone
  onPress: () => void;        // Funzione da eseguire al click
  style?: object;             // Stile personalizzato (opzionale)
}

// Il nostro bottone personalizzato
export default function CustomButton({ title, onPress, style }: CustomButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, style]}  // Combina stile base + personalizzato
      onPress={onPress}
      activeOpacity={0.8}  // Effetto quando premuto
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8B0000',  // Bordeaux di base (poi aggiungeremo gradiente)
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,  // Angoli arrotondati
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    // Ombra per profondità
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,  // Ombra su Android
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,  // Spaziatura lettere
  },
});