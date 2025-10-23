// screens/CollectionScreen.tsx
// Schermata collezione vini - identica al design GitHub

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import WineCard from '../components/WineCard';
import { wines } from '../data/wines';
import Logo from '../components/Logo';

export default function CollectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtra vini in base alla ricerca
  const filteredWines = wines.filter(wine => 
    wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wine.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wine.producer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddWine = () => {
    Alert.alert(
      'Aggiungi Vino',
      'Funzionalità in sviluppo! Qui potrai aggiungere nuovi vini alla tua collezione.',
      [{ text: 'OK' }]
    );
  };

  const handleWinePress = (wineId: string) => {
    Alert.alert(
      'Dettagli Vino',
      'Funzionalità in sviluppo! Qui vedrai i dettagli completi del vino.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header con Logo */}
      <View style={styles.header}>
        <Logo size="small" />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Titolo sezione */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Collezione di <Text style={styles.titleHighlight}>Vini</Text>
          </Text>
          <Text style={styles.subtitle}>
            "Esplora la nostra collezione di vini rossi d'eccellenza provenienti da tutto il mondo. 
            Ogni bottiglia racconta una storia unica di terroir, tradizione e maestria artigianale."
          </Text>
        </View>

        {/* Barra ricerca e filtri */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <MaterialIcons name="search" size={20} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cerca vini per nome, regione, anno o vitigno..."
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialIcons name="close" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.filterButton}>
              <MaterialIcons name="filter-list" size={20} color={Colors.text} />
              <Text style={styles.filterButtonText}>Filtri</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddWine}
            >
              <MaterialIcons name="add" size={20} color={Colors.text} />
              <Text style={styles.addButtonText}>Aggiungi Vino</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista vini */}
        <View style={styles.winesList}>
          {filteredWines.length > 0 ? (
            filteredWines.map((wine) => (
              <WineCard 
                key={wine.id} 
                wine={wine}
                onPress={() => handleWinePress(wine.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="wine-bar" size={64} color={Colors.textMuted} />
              <Text style={styles.emptyStateText}>
                Nessun vino trovato
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Prova a modificare i filtri di ricerca
              </Text>
            </View>
          )}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.text,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  filterButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  addButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  winesList: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 8,
  },
});