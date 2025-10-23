// screens/RecipesScreen.tsx
// Schermata ricette con abbinamenti vini

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Logo from '../components/Logo';
import RecipeCard from '../components/RecipeCard';
import { recipes, Recipe } from '../data/recipes';

type Category = 'tutti' | 'antipasto' | 'primo' | 'secondo' | 'dessert';

export default function RecipesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('tutti');

  // Filtra ricette per categoria
  const filteredRecipes = selectedCategory === 'tutti' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  const handleRecipePress = (recipe: Recipe) => {
    Alert.alert(
      recipe.name,
      `Difficoltà: ${recipe.difficulty}\nTempo: ${recipe.preparationTime} min\n\nAbbinamento: ${recipe.winepairing}`,
      [{ text: 'OK' }]
    );
  };

  const categories: { key: Category; label: string; icon: keyof typeof MaterialIcons.glyphMap }[] = [
    { key: 'tutti', label: 'Tutti', icon: 'restaurant-menu' },
    { key: 'antipasto', label: 'Antipasti', icon: 'restaurant' },
    { key: 'primo', label: 'Primi', icon: 'ramen-dining' },
    { key: 'secondo', label: 'Secondi', icon: 'set-meal' },
    { key: 'dessert', label: 'Dessert', icon: 'cake' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Logo size="small" />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Titolo */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Ricette <Text style={styles.titleHighlight}>Gourmet</Text>
          </Text>
          <Text style={styles.subtitle}>
            Scopri ricette tradizionali italiane con gli abbinamenti enologici perfetti per ogni piatto
          </Text>
        </View>

        {/* Filtri categorie */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryButton,
                selectedCategory === category.key && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <MaterialIcons 
                name={category.icon} 
                size={20} 
                color={selectedCategory === category.key ? Colors.text : Colors.textMuted} 
              />
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.key && styles.categoryButtonTextActive
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Contatore ricette */}
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'ricetta' : 'ricette'}
          </Text>
        </View>

        {/* Lista ricette */}
        <View style={styles.recipesList}>
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe}
              onPress={() => handleRecipePress(recipe)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    padding: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  titleHighlight: {
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: Colors.text,
  },
  counterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  counterText: {
    fontSize: 12,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  recipesList: {
    paddingHorizontal: 20,
  },
});