import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Sidebar from '@/components/SideBar';
import { ThemedText } from '@/components/ThemedText';
import HomeViews from '@/components/homeview';
import SearchBar from '@/components/SearchBar';

export default function HomeScreen() {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isSwitchEnabled, setSwitchEnabled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: isSwitchEnabled ? '#F2F4F4' : '#1B2631' }]}>
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={toggleSidebar}
        isSwitchEnabled={isSwitchEnabled}
        onSwitchChange={setSwitchEnabled}
      />
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <ThemedText style={styles.text}>☰</ThemedText>
      </TouchableOpacity>

      {/* Pass isSwitchEnabled prop to SearchBar */}
      <SearchBar onSearch={handleSearch} isSwitchEnabled={isSwitchEnabled} />

      {/* Pass isSwitchEnabled prop to HomeViews */}
      <HomeViews isSwitchEnabled={isSwitchEnabled} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Remove the backgroundColor here, it will be handled inline
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 15,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#BA0003',
  },
});
