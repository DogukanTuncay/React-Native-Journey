import React, { useReducer, useEffect } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import FadeWrapper from '../components/FadeWrapper';

const screens = {
  Splash: SplashScreen,
  Welcome: WelcomeScreen,
  Login: LoginScreen,
};

// Reducer ile ekran değiştirme
const screenReducer = (state, action) => action;

export default function Navigator() {

  const [screen, setScreen] = useReducer(screenReducer, 'Splash');
  const ScreenComponent = screens[screen];
  console.log(screens);
console.log("Aktif ekran:", screen);
console.log("ScreenComponent:", ScreenComponent);
if (!ScreenComponent) {
  console.error(`HATA: ${screen} adında bir ekran bulunamadı!`);
  return <Text>Hata! Ekran bulunamadı.</Text>;
}
  // SplashScreen için otomatik bir geçiş ekleyin
  useEffect(() => {
    if (screen === 'Splash') {
      const timer = setTimeout(() => {
        setScreen('Welcome');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [screen]);

  return (
    <View style={styles.container}>
      <FadeWrapper>
<ScreenComponent
  onNavigate={() => {
    if (screen === 'Welcome') {
      setScreen('Login');
    } else if (screen === 'Login') {
      setScreen('Welcome');
    }
  }}
  navigation={{
    replace: (newScreen) => setScreen(newScreen),
    navigate: (newScreen) => setScreen(newScreen),
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
