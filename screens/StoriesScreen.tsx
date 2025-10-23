import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StoriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📰 Storie</Text>
      <Text style={styles.subtitle}>Articoli su vini e regioni</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B0000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.7,
  },
});