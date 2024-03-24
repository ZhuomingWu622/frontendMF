import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthGuard } from '../components/AuthGuard';
import { CreateContentScreen } from '../components/CreateContentScreen/CreateContentScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <AuthGuard>
      
      <CreateContentScreen/>
      
      
    </AuthGuard>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
