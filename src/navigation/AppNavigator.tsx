import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import AdminScreen from '../screens/Admin/AdminScreen';  // Admin ekranı
import UserScreen from '../screens/User/UserScreen';    // User ekranı
import NotificationTestScreen from '../screens/NotificationTestScreen'; // Bildirim test ekranı
import FadeWrapper from '../components/FadeWrapper';
import ActivityTrackerScreen from '../screens/ActivityTrackerScreen';

// Ekranlar
const screens = {
  Splash: SplashScreen,
  Welcome: WelcomeScreen,
  Login: LoginScreen,
  Admin: AdminScreen,  // Admin ekranını ekledik
  User: UserScreen,    // User ekranını ekledik
  Notifications: NotificationTestScreen, // Bildirim test ekranını ekledik
  ActivityTracker: ActivityTrackerScreen
};

// Reducer ile ekran değiştirme
const screenReducer = (state: any, action: any) => action;

export default function Navigator() {
  const [screen, setScreen] = useReducer(screenReducer, 'Splash');
  const ScreenComponent = (screens as any)[screen];

  // SplashScreen için otomatik geçiş (koşulsuz hook çağrısı)
  useEffect(() => {
    if (screen === 'Splash') {
      const timer = setTimeout(() => {
        setScreen('Welcome');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  // Ekran bulunamadığı durumda hata göster
  if (!ScreenComponent) {
    console.error(`HATA: ${screen} adında bir ekran bulunamadı!`);
    return <Text>Hata! Ekran bulunamadı.</Text>;
  }

  // Ekran geçişi fonksiyonu
  const handleNavigate = (newScreen: any) => {
    setScreen(newScreen); // Parametre ile geçiş yapıyoruz
  };

  return (
    <View style={styles.container}>
      <FadeWrapper>
        <ScreenComponent
          onNavigate={handleNavigate} // Burada parametre ile yönlendirme yapıyoruz
          navigation={{
            replace: (newScreen: any) => setScreen(newScreen),
            navigate: (newScreen: any) => setScreen(newScreen),
          }}
        />
      </FadeWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
