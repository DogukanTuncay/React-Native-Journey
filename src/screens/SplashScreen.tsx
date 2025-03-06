// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, StatusBar, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Logo animasyonu için Animated değeri
  const logoOpacity = new Animated.Value(0);
  const logoScale = new Animated.Value(0.3);

  useEffect(() => {
    try {
      console.log("SplashScreen başlatıldı"); // Debug log

      // Logo animasyonu
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      // Splash ekranından ana ekrana geçiş için zamanlayıcı
      const timer = setTimeout(() => {
        try {
          console.log("Navigasyon başlatılıyor: WelcomeScreen"); // Debug log

          // Eğer veri yükleme işleminiz varsa, burada asenkron olarak yapın
          // const initialData = await fetchInitialData();

          // Ana ekrana geçiş
          navigation.replace('Welcome');
          console.log("Navigasyon başarılı"); // Bu log görülmüyorsa, navigasyon hatası var demektir
        } catch (navError) {
          console.error("Navigasyon hatası:", navError);
          // Hata durumunda alternatif bir yönlendirme yapabilirsiniz
          // navigation.navigate('Fallback');
        }
      }, 3000); // 3 saniye sonra geçiş yap

      // Component unmount olduğunda timer'ı temizle
      return () => {
        console.log("SplashScreen temizleniyor"); // Debug log
        clearTimeout(timer);
      };
    } catch (error) {
      console.error("SplashScreen genel hata:", error);
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />

      <Animated.Image
        source={require('../assets/logo.webp')}
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }]
          }
        ]}
        resizeMode="contain"
      />
      <Text style={styles.version}>Sürüm 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  version: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  }
});

export default SplashScreen;