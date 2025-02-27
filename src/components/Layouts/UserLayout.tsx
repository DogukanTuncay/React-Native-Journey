import React from 'react';
import { View, StyleSheet } from 'react-native';
import FooterMenu from '../../components/User/includes/FooterMenu';

const UserLayout = ({ children, onNavigate }) => {
  return (
    <View style={styles.container}>
      {/* Ana İçerik */}
      <View style={styles.content}>{children}</View>

      {/* Footer Menü */}
      <FooterMenu onNavigate={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  content: {
    flex: 1, // İçeriğin ekranın tamamını kaplamasını sağlıyor
    paddingBottom: 60, // Footer için boşluk bırakıyoruz
  },
});

export default UserLayout;
