// screens/HomeScreen.tsx
// Home screen con hero elegante - identico al design originale

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ImageBackground,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/Colors';

const { height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200' }}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
              style={styles.heroOverlay}
            >
              <View style={styles.heroContent}>
                <Logo size="large" />
                
                <View style={styles.quoteContainer}>
                  <Text style={styles.quoteText}>
                    Aprire una bottiglia di vino è come aprire una porta sulla storia.
                  </Text>
                  <Text style={styles.quoteAuthor}>— Ernest Hemingway</Text>
                </View>

                <View style={styles.scrollIndicator}>
                  <Text style={styles.scrollText}>Scorri per esplorare</Text>
                  <Text style={styles.scrollArrow}>↓</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Sezione presentazione */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>
            La Tua <Text style={styles.highlight}>Collezione</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            "Una bottiglia di vino contiene più filosofia che tutti i libri del mondo."
          </Text>
          <Text style={styles.sectionAuthor}>— Louis Pasteur</Text>

          <View style={styles.buttonsContainer}>
            <CustomButton
              title="Esplora Vini"
              onPress={() => navigation.navigate('Collezione')}
              style={styles.button}
            />
            <CustomButton
              title="Ricette"
              onPress={() => navigation.navigate('Ricette')}
              style={[styles.button, styles.buttonSecondary]}
            />
          </View>
        </View>

        {/* Sezione features */}
        <View style={styles.featuresSection}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🍷</Text>
            <Text style={styles.featureTitle}>Collezione Personale</Text>
            <Text style={styles.featureText}>
              Gestisci la tua cantina digitale con semplicità ed eleganza
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureTitle}>Dashboard Statistiche</Text>
            <Text style={styles.featureText}>
              Analizza la tua collezione con grafici e dati dettagliati
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🍝</Text>
            <Text style={styles.featureTitle}>Ricette & Abbinamenti</Text>
            <Text style={styles.featureText}>
              Scopri ricette gourmet con i migliori abbinamenti enologici
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Logo size="small" />
          <Text style={styles.footerText}>
            A personal wine cellar management system for the discerning collector.
          </Text>
          <Text style={styles.footerCopyright}>
            © 2025 DBarrique. Designed with ❤️ for wine lovers.
          </Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  heroContainer: {
    height: height * 0.85,
  },
  heroImage: {
    flex: 1,
    width: '100%',
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroContent: {
    alignItems: 'center',
    width: '100%',
  },
  quoteContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quoteText: {
    fontSize: 18,
    color: Colors.text,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  scrollText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  scrollArrow: {
    fontSize: 24,
    color: Colors.primary,
  },
  contentSection: {
    padding: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  highlight: {
    color: Colors.primary,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  sectionAuthor: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
  },
  buttonSecondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  featuresSection: {
    padding: 24,
    gap: 16,
  },
  featureCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 32,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 18,
  },
  footerCopyright: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});