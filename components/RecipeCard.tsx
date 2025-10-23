// components/RecipeCard.tsx
// Card per ricette di cucina

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Recipe } from '../data/recipes';

interface RecipeCardProps {
  recipe: Recipe;
  onPress?: () => void;
}

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  const categoryIcon = 
    recipe.category === 'antipasto' ? 'restaurant' :
    recipe.category === 'primo' ? 'ramen-dining' :
    recipe.category === 'secondo' ? 'set-meal' : 'cake';

  const difficultyColor = 
    recipe.difficulty === 'facile' ? Colors.success :
    recipe.difficulty === 'media' ? Colors.warning : Colors.error;

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.categoryBadge}>
          <MaterialIcons name={categoryIcon} size={20} color={Colors.primary} />
          <Text style={styles.categoryText}>{recipe.category.toUpperCase()}</Text>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: `${difficultyColor}20` }]}>
          <Text style={[styles.difficultyText, { color: difficultyColor }]}>
            {recipe.difficulty}
          </Text>
        </View>
      </View>

      <Text style={styles.name}>{recipe.name}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <MaterialIcons name="schedule" size={16} color={Colors.textMuted} />
          <Text style={styles.infoText}>{recipe.preparationTime} min</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="wine-bar" size={16} color={Colors.primary} />
          <Text style={styles.infoText}>{recipe.winepairing}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.ingredientsCount}>
          {recipe.ingredients.length} ingredienti
        </Text>
        <MaterialIcons name="chevron-right" size={24} color={Colors.textMuted} />
      </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryText: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  ingredientsCount: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});