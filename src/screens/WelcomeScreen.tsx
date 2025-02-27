import React from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet
} from 'react-native';

const  WelcomeScreen = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.webp')} style={styles.logo} />

      <Text style={styles.title}>Hoş Geldiniz! 👋</Text>
      <Text style={styles.subtitle}>Hemen giriş yap ve keşfetmeye başla.</Text>

      <TouchableOpacity style={styles.button} onPress={onNavigate}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default WelcomeScreen;