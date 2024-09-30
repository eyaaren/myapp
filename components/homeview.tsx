import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ListButton } from '@/components/ListButton';
import { imageUrls, groupImageUrls, ImageResource } from '@/components/imageurl';

const groupedImageUrls = groupImageUrls(imageUrls, 15); // Each 15 images in a group

const HomeViews: React.FC<{ isSwitchEnabled: boolean }> = ({ isSwitchEnabled }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageInfo, setSelectedImageInfo] = useState('');
  const [selectedImageTitle, setSelectedImageTitle] = useState('');

  const handleImagePress = (info: string, title: string) => {
    setSelectedImageInfo(info);
    setSelectedImageTitle(title);
    setModalVisible(true);
  };

  // Dynamic styles based on isSwitchEnabled prop
  const containerStyle = {
    backgroundColor: isSwitchEnabled ? '#F2F4F4' : '#1B2631',
    flex: 1,
    paddingLeft: 50,
  };

  return (
    <ThemedView style={containerStyle}>
      <FlatList
        data={groupedImageUrls}
        renderItem={({ item }) => (
          <View style={styles.horizontalListContainer}>
            <FlatList
              data={item.data as ImageResource[]} // Assert the type if needed
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={() => handleImagePress(item.info, item.title)}>
                    <ImageBackground
                      style={styles.imageBackground}
                      imageStyle={styles.imageStyle}
                      source={item.url}
                    >
                      <ListButton />
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{selectedImageTitle}</Text>
          <Text style={styles.modalText}>{selectedImageInfo}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  horizontalListContainer: {
    marginBottom: 30,
  },
  imageContainer: {
    margin: 5,
  },
  imageBackground: {
    width: 175,
    height: 225,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageStyle: {
    borderRadius: 15,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  closeButton: {
    backgroundColor: '#BA0003',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default HomeViews;
