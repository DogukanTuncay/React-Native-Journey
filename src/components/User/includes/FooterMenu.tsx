import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Alert } from 'react-native';

const FooterMenu = ({ onNavigate }) => {

      const handleComingSoon = () => {
        Alert.alert('Çok Yakında', 'Bu özellik yakında gelecek!');
      };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.label}>Ana Sayfa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
        <Text style={styles.icon}>👤</Text>
        <Text style={styles.label}>Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleComingSoon}>
        <Text style={styles.icon}>⚙️</Text>
        <Text style={styles.label}>Ayarlar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    color: '#333',
  },
});

export default FooterMenu;
