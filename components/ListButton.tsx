import React from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';

export const ListButton: React.FC = () => {
  const handlePress = () => {
    Alert.alert('Listeye eklendi!', 'Bu öğeyi listenizden kaldırmak için lütfen basılı tutun.');
  };
  const longPress = () => {
    Alert.alert('Listeden kaldırıldı!', 'Bu öğeyi listenize eklemek için lütfen butona tıklayın.');
  };

  return (
    <ThemedView style={styles.container}>
      <Pressable style={styles.button} onPress={handlePress} onLongPress={longPress}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // ThemedView stiline gerek olmayabilir, bu kısmı kaldırabilirsin
  },
  button: {
    position: 'absolute',
    bottom: 7,
    right: 7,
    backgroundColor: '#BA0003', // Butonun arka plan rengi
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
