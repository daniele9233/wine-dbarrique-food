// screens/WineDetailScreen.tsx
// Schermata dettagli vino con modalità visualizzazione e modifica

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
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
import RatingStars from '../components/RatingStars';

export default function WineDetailScreen({ route, navigation }: any) {
  const { wineId } = route.params;
  const { getWineById, updateWine, deleteWine } = useWines();
  const insets = useSafeAreaInsets();

  const [wine, setWine] = useState<Wine | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [producer, setProducer] = useState('');
  const [region, setRegion] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState<Wine['type']>('red');
  const [rating, setRating] = useState(5);
  const [grapes, setGrapes] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    loadWine();
  }, [wineId]);

  const loadWine = () => {
    const loadedWine = getWineById(wineId);
    if (loadedWine) {
      setWine(loadedWine);
      setName(loadedWine.name);
      setProducer(loadedWine.producer || '');
      setRegion(loadedWine.region);
      setYear(loadedWine.year.toString());
      setType(loadedWine.type);
      setRating(loadedWine.rating);
      setGrapes(loadedWine.grapes?.join(', ') || '');
      setNotes(loadedWine.notes || '');
      setImageUri(loadedWine.image || '');
    } else {
      Alert.alert('Errore', 'Vino non trovato', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  const handleImageSelected = async (uri: string) => {
    Keyboard.dismiss();
    await new Promise(resolve => setTimeout(resolve, 100));
    setImageUri(uri);
  };

  const handleSave = async () => {
    if (!name.trim() || !region.trim() || !year.trim()) {
      Alert.alert('Errore', 'Nome, regione e anno sono obbligatori');
      return;
    }

    setSaving(true);

    const updatedWine: Wine = {
      ...wine!,
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

    const success = await updateWine(updatedWine);

    setSaving(false);

    if (success) {
      setWine(updatedWine);
      setIsEditing(false);
      Alert.alert('Successo', 'Vino aggiornato!');
    } else {
      Alert.alert('Errore', 'Impossibile salvare le modifiche');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Elimina Vino',
      `Sei sicuro di voler eliminare "${wine?.name}" dalla collezione?`,
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteWine(wineId);
            if (success) {
              Alert.alert('Eliminato', 'Vino rimosso dalla collezione', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } else {
              Alert.alert('Errore', 'Impossibile eliminare il vino');
            }
          },
        },
      ]
    );
  };

  const wineTypes: Array<{ key: Wine['type']; label: string }> = [
    { key: 'red', label: 'Rosso' },
    { key: 'white', label: 'Bianco' },
    { key: 'rosé', label: 'Rosato' },
    { key: 'sparkling', label: 'Spumante' },
  ];

  if (!wine) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Caricamento...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {wine.name}
        </Text>
        {!isEditing ? (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
            <MaterialIcons name="edit" size={24} color={Colors.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.editButton}>
            <MaterialIcons name="close" size={24} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
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
          {isEditing ? (
            <>
              <ImagePickerComponent imageUri={imageUri} onImageSelected={handleImageSelected} />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome Vino *</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Nome del vino"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Produttore</Text>
                <TextInput
                  style={styles.input}
                  value={producer}
                  onChangeText={setProducer}
                  placeholder="Nome produttore"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>Regione *</Text>
                  <TextInput
                    style={styles.input}
                    value={region}
                    onChangeText={setRegion}
                    placeholder="Regione"
                    placeholderTextColor={Colors.textMuted}
                  />
                </View>
                <View style={[styles.inputGroup, styles.yearInput]}>
                  <Text style={styles.label}>Anno *</Text>
                  <TextInput
                    style={styles.input}
                    value={year}
                    onChangeText={setYear}
                    placeholder="Anno"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
              </View>

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
                        style={[
                          styles.typeButtonText,
                          type === wineType.key && styles.typeButtonTextActive,
                        ]}
                      >
                        {wineType.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <RatingInput initialRating={rating} onRatingChange={setRating} />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vitigni (separati da virgola)</Text>
                <TextInput
                  style={styles.input}
                  value={grapes}
                  onChangeText={setGrapes}
                  placeholder="Es. Nebbiolo, Barbera"
                  placeholderTextColor={Colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Note di Degustazione</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Note, aromi, sapori..."
                  placeholderTextColor={Colors.textMuted}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={handleSave}
                disabled={saving}
              >
                <MaterialIcons name="save" size={20} color={Colors.text} />
                <Text style={styles.saveButtonText}>
                  {saving ? 'Salvataggio...' : 'Salva Modifiche'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <MaterialIcons name="delete" size={20} color={Colors.text} />
                <Text style={styles.deleteButtonText}>Elimina Vino</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {wine.image && (
                <Image source={{ uri: wine.image }} style={styles.wineImage} />
              )}

              <View style={styles.infoCard}>
                <Text style={styles.wineName}>{wine.name}</Text>
                {wine.producer && (
                  <Text style={styles.wineProducer}>{wine.producer}</Text>
                )}
                
                <View style={styles.ratingContainer}>
                  <RatingStars rating={wine.rating} size={20} />
                </View>

                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="place" size={20} color={Colors.primary} />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Regione</Text>
                      <Text style={styles.detailValue}>{wine.region}</Text>
                    </View>
                  </View>

                  <View style={styles.detailItem}>
                    <MaterialIcons name="calendar-today" size={20} color={Colors.primary} />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Anno</Text>
                      <Text style={styles.detailValue}>{wine.year}</Text>
                    </View>
                  </View>

                  <View style={styles.detailItem}>
                    <MaterialIcons name="wine-bar" size={20} color={Colors.primary} />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Tipo</Text>
                      <Text style={styles.detailValue}>
                        {wineTypes.find(t => t.key === wine.type)?.label}
                      </Text>
                    </View>
                  </View>

                  {wine.grapes && wine.grapes.length > 0 && (
                    <View style={styles.detailItem}>
                      <MaterialIcons name="eco" size={20} color={Colors.primary} />
                      <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Vitigni</Text>
                        <Text style={styles.detailValue}>{wine.grapes.join(', ')}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>

              {wine.notes && (
                <View style={styles.notesCard}>
                  <Text style={styles.notesTitle}>Note di Degustazione</Text>
                  <Text style={styles.notesText}>{wine.notes}</Text>
                </View>
              )}
            </>
          )}
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
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
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
  editButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  wineImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  wineName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  wineProducer: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
  },
  notesCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
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
    marginBottom: 12,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginBottom: 20,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
