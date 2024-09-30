

import React from 'react';
import { Alert, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { loginUser, registerUser } from '@/scripts/apiService';
import { NavigationContainer } from '@react-navigation/native';


const LoginScreen: React.FC = () => {
 
  const [isLoginModalVisible, setIsLoginModalVisible] = React.useState<boolean>(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = React.useState<string>(''); // Yeni state eklendi

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await loginUser({ username, password });
      console.log(response); // Giriş başarılıysa API'den dönen yanıt burada
      setIsLoginModalVisible(false);
      Alert.alert("Başarılı", "Giriş yapıldı!");
    } catch (error) {
      Alert.alert("Hata", "Giriş işlemi başarısız.");
    }
  };
  

  const handleSignUp = async (): Promise<void> => {
    if (password !== passwordRepeat) {
      Alert.alert("Hata", "Şifreler eşleşmiyor.");
      return;
    }

    try {
      await registerUser({ firstName, lastName, username, password, passwordRepeat });
      setIsSignUpModalVisible(false);
      Alert.alert("Başarılı", "Kayıt tamamlandı!");
    } catch (error) {
      console.log(error); // Hata mesajını konsola yazdır
      Alert.alert("Hata", "Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>TRT</ThemedText>
      <ThemedText style={{ fontSize: 24, fontWeight: 'bold', color: '#BA0003', }}>
             ÇOCUK
       </ThemedText>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setIsLoginModalVisible(true)}>
          <ThemedText style={styles.buttonText}>Giriş Yap</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setIsSignUpModalVisible(true)}>
          <ThemedText style={styles.buttonText}>Kayıt Ol</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Giriş Yap Modalı */}
      <Modal transparent visible={isLoginModalVisible} animationType="slide">
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Kullanıcı Adı" 
              placeholderTextColor="#888" 
              onChangeText={setUsername}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Şifre" 
              placeholderTextColor="#888" 
              secureTextEntry 
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.actionButton} onPress={handleLogin}>
              <ThemedText style={styles.actionButtonText}>Giriş Yap</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsLoginModalVisible(false)}>
              <ThemedText style={styles.closeButtonText}>Kapat</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>

      {/* Kayıt Ol Modalı */}
      <Modal transparent visible={isSignUpModalVisible} animationType="slide">
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <TextInput 
              style={styles.textInput} 
              placeholder="İsim" 
              placeholderTextColor="#888" 
              onChangeText={setFirstName}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Soyisim" 
              placeholderTextColor="#888" 
              onChangeText={setLastName}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Kullanıcı Adı" 
              placeholderTextColor="#888" 
              onChangeText={setUsername}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Şifre" 
              placeholderTextColor="#888" 
              secureTextEntry 
              onChangeText={setPassword}
            />
            <TextInput 
              style={styles.textInput} 
              placeholder="Şifre (Tekrar)" 
              placeholderTextColor="#888" 
              secureTextEntry 
              onChangeText={setPasswordRepeat} // Yeni ekleme
            />
            <TouchableOpacity style={styles.actionButton} onPress={handleSignUp}>
              <ThemedText style={styles.actionButtonText}>Kayıt Ol</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsSignUpModalVisible(false)}>
              <ThemedText style={styles.closeButtonText}>Kapat</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B2631',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 125,
    color: '#BA0003',
    lineHeight: 150,
    textShadowColor: '#000',
    textShadowOffset: { width: 18, height: 18 },
    textShadowRadius: 35,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#BA0003',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  textInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#BA0003',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#BA0003',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default LoginScreen;
