import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import UserLayout from '../../components/Layouts/UserLayout';


const UserScreen = ({ onNavigate, username }) => {
  const handleLogout = () => {
    onNavigate('Welcome'); // Çıkış yapıldığında Welcome ekranına yönlendir
  };

  const handleComingSoon = () => {
    Alert.alert('Çok Yakında', 'Bu özellik yakında gelecek!');
  };

  return (
    <UserLayout onNavigate={onNavigate}>
      <View style={styles.container}>
        <Text style={styles.title}>Hoş Geldiniz, {username}!</Text>
        <Text style={styles.subtitle}>Hesabınızla ilgili işlemlere buradan erişebilirsiniz.</Text>

        <TouchableOpacity style={styles.button} onPress={handleComingSoon}>
          <Text style={styles.buttonText}>Hesap Bilgileri</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleComingSoon}>
          <Text style={styles.buttonText}>Ayarlar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </UserLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2D3A5F',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#5F6368',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 2,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default UserScreen;
