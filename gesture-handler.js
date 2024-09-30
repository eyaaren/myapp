import { Platform } from 'react-native';

if (Platform.OS !== 'web') {
  // Web değilse react-native-gesture-handler'ı içe aktar
  require('react-native-gesture-handler');
}
