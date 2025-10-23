// components/WineCard.tsx
// Card per mostrare un vino nella collezione

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import RatingStars from './RatingStars';
import { Wine } from '../data/wines';

interface WineCardProps {
  wine: Wine;
  onPress?: () => void;
}

export default function WineCard({ wine, onPress }: WineCardProps) {
  const typeLabel = wine.type === 'red' ? 'RED' : 
                    wine.type === 'white' ? 'WHITE' : 
                    wine.type === 'rosé' ? 'ROSÉ' : 'SPARKLING';
  
  const typeColor = wine.type === 'red' ? Colors.primary : 
                    wine.type === 'white' ? '#F4E4C1' : 
                    wine.type === 'rosé' ? '#FFB6C1' : '#FFD700';

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Badge tipo vino */}
      <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
        <Text style={styles.typeBadgeText}>{typeLabel}</Text>
      </View>

      {/* Immagine placeholder o immagine vino */}
      <View style={styles.imageContainer}>
        {wine.image ? (
          <Image source={{ uri: wine.image }} style={styles.image} />
        ) : (
          <MaterialIcons name="wine-bar" size={80} color={Colors.textMuted} />
        )}
      </View>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <RatingStars rating={wine.rating} size={14} />
      </View>

      {/* Info vino */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{wine.name}</Text>
        {wine.producer && (
          <Text style={styles.producer} numberOfLines={1}>{wine.producer}</Text>
        )}
        <View style={styles.detailsRow}>
          <Text style={styles.region}>{wine.region}</Text>
          <Text style={styles.year}>{wine.year}</Text>
        </View>
      </View>

      {/* Pulsante aggiungi/dettagli */}
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <MaterialIcons name="add" size={24} color={Colors.text} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  typeBadgeText: {
    color: Colors.background,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  imageContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ratingContainer: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  infoContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  producer: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  region: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  year: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});