// screens/DashboardScreen.tsx
// Dashboard con statistiche collezione

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import Logo from '../components/Logo';
import StatCard from '../components/StatCard';
import { wines, getWineStats } from '../data/wines';

export default function DashboardScreen() {
  const stats = getWineStats(wines);

  // Tipo di vino tradotto in italiano
  const typeLabels: { [key: string]: string } = {
    red: 'Rosso',
    white: 'Bianco',
    rosé: 'Rosato',
    sparkling: 'Spumante',
  };

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
            La Tua <Text style={styles.titleHighlight}>Dashboard</Text>
          </Text>
          <Text style={styles.subtitle}>
            Panoramica completa della tua collezione di vini
          </Text>
        </View>

        {/* Statistiche principali */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Totale Vini"
            value={stats.totalWines}
            subtitle="Nella tua collezione"
            icon="wine-bar"
          />

          <StatCard
            title="Valutazione Media"
            value={`${stats.avgRating}/10`}
            subtitle="Su 10 punti"
            icon="star"
          />

          <StatCard
            title="Tipo Più Comune"
            value={typeLabels[stats.mostCommonType]}
            subtitle={`${stats.typeCount[stats.mostCommonType]} bottiglie in collezione`}
            icon="local-bar"
          />
        </View>

        {/* Distribuzione per tipo */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Distribuzione per Tipo</Text>
          
{Object.entries(stats.typeCount).map(([type, count]) => {
  const percentage = (count / stats.totalWines) * 100; // Numero, non stringa
  return (
    <View key={type} style={styles.distributionItem}>
      <View style={styles.distributionHeader}>
        <Text style={styles.distributionLabel}>
          {typeLabels[type]}
        </Text>
        <Text style={styles.distributionValue}>
          {count} ({percentage.toFixed(0)}%)
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${percentage}%` }  // ✅ Ora percentage è un numero
          ]} 
        />
      </View>
    </View>
  );
})}
        </View>

        {/* Migliori vini */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Vini Meglio Valutati</Text>
          
          {wines
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
            .map((wine, index) => (
              <View key={wine.id} style={styles.topWineItem}>
                <View style={styles.topWineRank}>
                  <Text style={styles.topWineRankText}>{index + 1}</Text>
                </View>
                <View style={styles.topWineInfo}>
                  <Text style={styles.topWineName}>{wine.name}</Text>
                  <Text style={styles.topWineDetails}>
                    {wine.region} • {wine.year}
                  </Text>
                </View>
                <View style={styles.topWineRating}>
                  <Text style={styles.topWineRatingText}>{wine.rating}</Text>
                  <Text style={styles.topWineRatingLabel}>/10</Text>
                </View>
              </View>
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
    marginBottom: 8,
  },
  titleHighlight: {
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statsContainer: {
    paddingHorizontal: 20,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  distributionItem: {
    marginBottom: 20,
  },
  distributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  distributionLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  distributionValue: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  topWineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topWineRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topWineRankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  topWineInfo: {
    flex: 1,
  },
  topWineName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  topWineDetails: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  topWineRating: {
    alignItems: 'center',
  },
  topWineRatingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  topWineRatingLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});