// components/RatingInput.tsx
// Rating con stelle + input numerico per decimali precisi (NO dipendenze esterne)

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface RatingInputProps {
  initialRating?: number;
  onRatingChange: (rating: number) => void;
}

export default function RatingInput({ initialRating = 5, onRatingChange }: RatingInputProps) {
  const [rating, setRating] = useState(initialRating);
  const [inputValue, setInputValue] = useState(initialRating.toString());

  const handleStarPress = (starValue: number) => {
    // Ogni stella rappresenta 2 punti (5 stelle = 10 punti)
    const newRating = starValue * 2;
    setRating(newRating);
    setInputValue(newRating.toString());
    onRatingChange(newRating);
  };

  const handleQuickSelect = (value: number) => {
    setRating(value);
    setInputValue(value.toString());
    onRatingChange(value);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    
    // Valida input
    const numValue = parseFloat(text);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 10) {
      const roundedValue = Math.round(numValue * 10) / 10; // Arrotonda a 1 decimale
      setRating(roundedValue);
      onRatingChange(roundedValue);
    }
  };

  const renderStars = () => {
    const stars = [];
    const ratingInStars = rating / 2; // Converti da 0-10 a 0-5

    for (let i = 1; i <= 5; i++) {
      const isFull = i <= Math.floor(ratingInStars);
      const isHalf = i === Math.ceil(ratingInStars) && ratingInStars % 1 >= 0.5;

      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starButton}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={isFull ? 'star' : isHalf ? 'star-half' : 'star-border'}
            size={32}
            color={Colors.primary}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valutazione</Text>
      
      {/* Stelle visualizzazione */}
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>

      {/* Display e input combinati */}
      <View style={styles.ratingInputContainer}>
        <View style={styles.ratingDisplay}>
          <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
          <Text style={styles.ratingMax}>/10</Text>
        </View>
        
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Inserisci valore preciso (0-10):</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType="decimal-pad"
            placeholder="Es. 7.5"
            placeholderTextColor={Colors.textMuted}
            maxLength={4}
          />
        </View>
      </View>

      {/* Selezione rapida numeri comuni */}
      <View style={styles.quickSelectContainer}>
        <Text style={styles.quickSelectLabel}>Valori rapidi:</Text>
        <View style={styles.quickSelectButtons}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.quickSelectButton,
                rating === value && styles.quickSelectButtonActive,
              ]}
              onPress={() => handleQuickSelect(value)}
            >
              <Text
                style={[
                  styles.quickSelectText,
                  rating === value && styles.quickSelectTextActive,
                ]}
              >
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Suggerimenti mezzi voti */}
      <View style={styles.halfVotesContainer}>
        <Text style={styles.halfVotesLabel}>Mezzi voti:</Text>
        <View style={styles.quickSelectButtons}>
          {[5.5, 6.5, 7.5, 8.5, 9.5].map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.quickSelectButton,
                rating === value && styles.quickSelectButtonActive,
              ]}
              onPress={() => handleQuickSelect(value)}
            >
              <Text
                style={[
                  styles.quickSelectText,
                  rating === value && styles.quickSelectTextActive,
                ]}
              >
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingInputContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  ratingMax: {
    fontSize: 18,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  inputWrapper: {
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    textAlign: 'center',
    minWidth: 100,
    fontWeight: 'bold',
  },
  quickSelectContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  quickSelectLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  quickSelectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  quickSelectButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickSelectButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  quickSelectText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  quickSelectTextActive: {
    color: Colors.text,
  },
  halfVotesContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  halfVotesLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
});