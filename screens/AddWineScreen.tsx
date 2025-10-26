// screens/AddWineScreen.tsx
// Schermata per aggiungere un nuovo vino

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { useWines } from '../contexts/WineContext';
import { Wine } from '../data/wines';
import ImagePickerComponent from '../components/ImagePickerComponent';
import RatingInput from '../components/RatingInput';

export default function AddWineScreen({ navigation }: any) {
  const { addWine } = useWines();
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [producer, setProducer] = useState('');
  const [region, setRegion] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState<'red' | 'white' | 'rosé' | 'sparkling'>('red');
  const [rating, setRating] = useState(5);
  const [grapes, setGrapes] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [saving, setSaving] = useState(false);

  const wineTypes: Array<{ key: Wine['type']; label: string }> = [
    { key: 'red', label: 'Rosso' },
    { key: 'white', label: 'Bianco' },
    { key: 'rosé', label: 'Rosato' },
    { key: 'sparkling', label: 'Spumante' },
  ];

  const handleImageSelected = async (uri: string) => {
    Keyboard.dismiss();
    await new Promise(resolve => setTimeout(resolve, 100));
    setImageUri(uri);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Errore', 'Il nome del vino è obbligatorio');
      return;
    }
    if (!region.trim()) {
      Alert.alert('Errore', 'La regione è obbligatoria');
      return;
    }
    if (!year.trim() || isNaN(Number(year))) {
      Alert.alert('Errore', 'Inserisci un anno valido');
      return;
    }

    setSaving(true);

    const newWine: Wine = {
      id: Date.now().toString(),
      name: name.trim(),
      producer: producer.trim() || undefined,
      region: region.trim(),
      year: Number(year),
      type,
      rating,
      notes: notes.trim() || undefined,
      grapes: grapes.trim() ? grapes.split(',').map(g => g.trim()) : undefined,
      image: imageUri || undefined,
    };

    const success = await addWine(newWine);

    setSaving(false);

    if (success) {
      Alert.alert('Successo', 'Vino aggiunto alla collezione!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert('Errore', 'Impossibile salvare il vino. Riprova.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aggiungi Vino</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingTop: 20,
              paddingBottom: insets.bottom + 100,
            }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Upload immagine */}
          <ImagePickerComponent imageUri={imageUri} onImageSelected={handleImageSelected} />

          {/* Nome */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Vino *</Text>
            <TextInput
              style={styles.input}
              placeholder="Es. Barolo Cannubi"
              placeholderTextColor={Colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Produttore */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Produttore</Text>
            <TextInput
              style={styles.input}
              placeholder="Es. Marchesi di Barolo"
              placeholderTextColor={Colors.textMuted}
              value={producer}
              onChangeText={setProducer}
            />
          </View>

          {/* Regione e Anno */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Regione *</Text>
              <TextInput
                style={styles.input}
                placeholder="Es. Piemonte"
                placeholderTextColor={Colors.textMuted}
                value={region}
                onChangeText={setRegion}
              />
            </View>
            <View style={[styles.inputGroup, styles.yearInput]}>
              <Text style={styles.label}>Anno *</Text>
              <TextInput
                style={styles.input}
                placeholder="2020"
                placeholderTextColor={Colors.textMuted}
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </View>

          {/* Tipo vino */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo Vino</Text>
            <View style={styles.typeContainer}>
              {wineTypes.map((wineType) => (
                <TouchableOpacity
                  key={wineType.key}
                  style={[styles.typeButton, type === wineType.key && styles.typeButtonActive]}
                  onPress={() => setType(wineType.key)}
                >
                  <Text
                    style={[styles.typeButtonText, type === wineType.key && styles.typeButtonTextActive]}
                  >
                    {wineType.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rating */}
          <RatingInput initialRating={rating} onRatingChange={setRating} />

          {/* Vitigni */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vitigni (separati da virgola)</Text>
            <TextInput
              style={styles.input}
              placeholder="Es. Nebbiolo, Barbera"
              placeholderTextColor={Colors.textMuted}
              value={grapes}
              onChangeText={setGrapes}
            />
          </View>

          {/* Note */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Note di Degustazione</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrivi il vino, aromi, sapori, abbinamenti..."
              placeholderTextColor={Colors.textMuted}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Pulsante salva */}
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <MaterialIcons name="save" size={20} color={Colors.text} />
            <Text style={styles.saveButtonText}>{saving ? 'Salvataggio...' : 'Salva Vino'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  yearInput: {
    width: 100,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typeButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  typeButtonTextActive: {
    color: Colors.text,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
