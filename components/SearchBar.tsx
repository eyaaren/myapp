import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const SearchBar: React.FC<{ onSearch: (query: string) => void; isSwitchEnabled: boolean }> = ({ onSearch, isSwitchEnabled }) => {
  return (
    <View style={[styles.container, { backgroundColor: isSwitchEnabled ? '#F2F4F4' : '#1B2631' }]}>
      <TextInput
        style={styles.input}
        placeholder="Arama yap..."
        placeholderTextColor={isSwitchEnabled ? '#000000' : '#ffffff'}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 50,
    margin: 50,
    marginTop: 40, // Aşağıya indirmek için
    borderWidth: 2, // Kırmızı çerçeve için
    borderColor: '#BA0003', // Çerçeve rengi
  },
  input: {
    flex: 1,
    color: '#ffffff',
    marginLeft: 10,
  },
  label: {
    color: '#ffffff',
  },
});

export default SearchBar;
