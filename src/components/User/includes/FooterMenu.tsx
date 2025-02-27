import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FooterMenu = ({ onNavigate }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => onNavigate('User')}>
        <Text style={styles.footerButtonText}>Kullanıcı</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => onNavigate('Settings')}>
        <Text style={styles.footerButtonText}>Ayarlar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => onNavigate('Help')}>
        <Text style={styles.footerButtonText}>Yardım</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007AFF', // Blue background for footer
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#0061D1',
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FooterMenu;
