// components/Logo.tsx
// Logo DBarrique elegante

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ size = 'medium' }: LogoProps) {
  const fontSize = size === 'small' ? 24 : size === 'large' ? 48 : 36;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.logo, { fontSize }]}>
        <Text style={styles.d}>d</Text>
        <Text style={styles.barrique}>Barrique</Text>
      </Text>
      {size !== 'small' && (
        <Text style={styles.subtitle}>WINE COLLECTION</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  d: {
    color: Colors.text,
    fontFamily: 'serif',
  },
  barrique: {
    color: Colors.primary,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 3,
    marginTop: 5,
    fontWeight: '300',
  },
});