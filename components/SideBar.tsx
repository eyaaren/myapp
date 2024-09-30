import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Switch, Modal, Linking, Image, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';


interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  isSwitchEnabled: boolean;
  onSwitchChange: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose, isSwitchEnabled, onSwitchChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemPress = (item: string) => {
    setSelectedItem(item);
    setModalVisible(item === 'Yardım' || item === 'Ayarlar' || item === 'Profilim' || item === 'Listem' || item === 'Oyunlar');
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };


  const renderoyunlarContent = () => (
    <View style={styles.oyunlarContent}>
      <ThemedText style={styles.oyunlarItem}>YAPBOZ</ThemedText>
      <Image 
        source={require('../assets/istockphoto-1442727551-612x612.jpg')} 
        style={{ width: 200, height: 200 , borderRadius: 50}} 
      />
       <ThemedText style={styles.oyunlarItem}>SUDOKU</ThemedText>
      <Image 
        source={require('../assets/images.png')} 
        style={{ width: 200, height: 200, borderRadius:50 }} 
      />
       <ThemedText style={styles.oyunlarItem}>SATRANÇ</ThemedText>
      <Image 
        source={require('../assets/Unknown.jpeg')} 
        style={{ width: 200, height: 200, borderRadius:50 }} 
      />
      
    </View>
  );




  const renderHelpContent = () => (
    <View style={styles.helpContent}>
      <ThemedText style={styles.faqTitle}>Sıkça Sorulan Sorular</ThemedText>
      {Array.from({ length: 10 }, (_, index) => (
        <ThemedText key={index} style={styles.faqItem}>
          {index + 1}. {getFAQQuestion(index)}
        </ThemedText>
      ))}
      <ThemedText style={styles.link} onPress={() => Linking.openURL('https://trtcocuk.net.tr')}>
        Daha fazla bilgi için buraya tıklayın.
      </ThemedText>
    </View>
  );

  const renderSettingsContent = () => (
    <View style={styles.settingsContent}>
      <ThemedText style={styles.settingsTitle}>Ayarlar</ThemedText>
      <ThemedText style={styles.settingsItem}>Hesap</ThemedText>
      <ThemedText style={styles.settingsItem}>Bildirimler</ThemedText>
      <ThemedText style={styles.settingsItem}>Genel</ThemedText>
      <ThemedText style={styles.settingsItem}>Veriler</ThemedText>
      <ThemedText style={styles.settingsItem}>Gizlilik</ThemedText>
      <ThemedText style={styles.settingsItem}>Hakkında</ThemedText>
      <ThemedText style={styles.settingsItem}>Depolama</ThemedText>
      <ThemedText style={styles.settingsItem}>Hesabı Sil</ThemedText>
    </View>
  );

  const renderProfileContent = () => (
    <View style={styles.profileContent}>
      <ThemedText style={styles.profileTitle}>PROFİLİM</ThemedText>
      <Image  source={require('../assets/images-1.png')} 
        style={{ width: 300, height: 300, borderRadius:150,marginBottom:50 }} />
      <ThemedText style={styles.profileItem}>Profil Fotoğrafını Düzenle</ThemedText>
      <ThemedText style={styles.profileItem}>Ad</ThemedText>
      <ThemedText style={styles.profileItem}>Soyad</ThemedText>
      <ThemedText style={styles.profileItem}>Kullanıcı_Adı</ThemedText>
    </View>
  );

  const renderListemContent = () => (
    <View style={styles.listemContent}>
      <ThemedText style={styles.listemItem}>LİSTENİZDE İÇERİK BULUNMAMAKTADIR</ThemedText>
    </View>
  );

  

  const getFAQQuestion = (index: number) => {
    const questions = [
      'Uygulamayı nasıl kullanabilirim?',
      'Şifremi unuttum, ne yapmalıyım?',
      'Çocuklarımın aktivitelerini nasıl takip edebilirim?',
      'Temayı nasıl değiştirebilirim?',
      'Uygulama neden donuyor?',
      'Hesabımı nasıl silebilirim?',
      'Bildirim ayarlarını nasıl değiştirebilirim?',
      'Destek ekibine nasıl ulaşabilirim?',
      'Uygulama içi satın almalar nasıl çalışır?',
      'Gizlilik ayarlarımı nasıl yönetebilirim?',
    ];
    return questions[index] || 'Soru yok';
  };

  return (
    <ThemedView style={[styles.sidebar, { width: isVisible ? '33%' : 0, backgroundColor: isSwitchEnabled ? '#F2F4F4' : '#1B2631' }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <ThemedText style={styles.closeText}>X</ThemedText>
      </TouchableOpacity>

      {['Oyunlar', 'Listem', 'Profilim', 'Ayarlar', 'Yardım'].map(item => (
        <TouchableOpacity key={item} onPress={() => handleItemPress(item)}>
          <ThemedText style={[styles.item, { color: isSwitchEnabled ? '#000000' : '#ffffff' }]}>{item} {getIconForItem(item)}</ThemedText>
        </TouchableOpacity>
      ))}

      {isVisible && (
        <View style={styles.switchContainer}>
          <ThemedText style={[styles.switchLabel, { color: isSwitchEnabled ? '#000000' : '#ffffff' }]}>Tema</ThemedText>
          <Switch
            value={isSwitchEnabled}
            onValueChange={onSwitchChange}
            trackColor={{ 
              false: '#F1948A', 
              true: '#D4EFDF' 
            }}
            thumbColor={isSwitchEnabled ? '#52BE80' : '#BA0003'}
          />
        </View>
      )}

      {/* Modal for displaying selected item content */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
            <ThemedText style={styles.modalCloseText}>X</ThemedText>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            {selectedItem === 'Yardım' ? renderHelpContent() :
              selectedItem === 'Ayarlar' ? renderSettingsContent() :
              selectedItem === 'Profilim' ? renderProfileContent() :
              selectedItem === 'Oyunlar'  ? renderoyunlarContent () :
              selectedItem === 'Listem' ? renderListemContent() : (
              <>
                <ThemedText style={styles.modalTitle}>{selectedItem}</ThemedText>
                <ThemedText style={styles.modalDescription}>Details about {selectedItem} go here.</ThemedText>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
};

// Function to get icons based on item name
const getIconForItem = (item: string) => {
  switch (item) {
    case 'Oyunlar':
      return '🎮';
    case 'Listem':
      return '📃';
    case 'Profilim':
      return '👤';
    case 'Ayarlar':
      return '⚙️';
    case 'Yardım':
      return '❗️';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRightWidth: 1,
    borderColor: '#1B2631',
    padding: 20,
    zIndex: 1000,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 50,
  },
  closeText: {
    fontSize: 12,
    color: '#1B2631',
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
  },
  switchContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B2631',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#1B2631',
    zIndex: 1,
  },
  modalCloseText: {
    fontSize: 24,
    color: '#ffffff',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1B2631',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 10,
  },
  helpContent: {
    alignItems: 'flex-start',
    padding: 20,
    marginTop: 20,
  },
  settingsContent: {
    alignItems: 'flex-start',
    padding: 5,
  },
  settingsTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 60,
  },
  faqTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  faqItem: {
    fontSize: 18,
    color: '#ffffff',
    marginVertical: 7,
  },
  settingsItem: {
    fontSize: 20,
    color: '#ffffff',
    marginVertical: 20,
  },
  link: {
    fontSize: 16,
    color: '#BA0003',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  profileContent: {
    alignItems: 'flex-start',
    padding: 5,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 50,
  },
  profileItem: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  listemContent: {
    alignItems: 'flex-start',
    padding: 5,
  },
  listemItem: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 100,
  },
  oyunlarContent: {
    alignItems: 'flex-start',
    padding: 20,
    marginTop: 20,
  },
  oyunlarItem: {
    fontSize: 20,
    color: '#ffffff',
    marginVertical: 20,
  },
});

export default Sidebar;
