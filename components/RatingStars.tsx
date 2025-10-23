// components/RatingStars.tsx
// Stelle per rating vini (0-10 scale)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

interface RatingStarsProps {
  rating: number; // 0-10
  showNumber?: boolean;
  size?: number;
}

export default function RatingStars({ rating, showNumber = true, size = 16 }: RatingStarsProps) {
  // Converti da 0-10 a 0-5 per le stelle
  const stars = rating / 2;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {/* Stelle piene */}
        {[...Array(fullStars)].map((_, i) => (
          <MaterialIcons key={`full-${i}`} name="star" size={size} color={Colors.primary} />
        ))}
        
        {/* Mezza stella */}
        {hasHalfStar && (
          <MaterialIcons name="star-half" size={size} color={Colors.primary} />
        )}
        
        {/* Stelle vuote */}
        {[...Array(emptyStars)].map((_, i) => (
          <MaterialIcons key={`empty-${i}`} name="star-border" size={size} color={Colors.primary} />
        ))}
      </View>
      
      {showNumber && (
        <Text style={styles.ratingText}>{rating.toFixed(1)}/10</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});