import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import UserLayout from '../../components/Layouts/UserLayout';

const UserScreen = ({ onNavigate, username }) => {
  const [moodRating, setMoodRating] = useState(3);

  const handleLogout = () => {
    onNavigate('Welcome'); // Çıkış yapıldığında Welcome ekranına yönlendir
  };

  const handleMoodSelection = (rating) => {
    setMoodRating(rating);
    Alert.alert('Ruh Haliniz Kaydedildi', 'Bugünkü ruh haliniz başarıyla kaydedildi.');
  };

  const handleFeaturePress = (feature) => {
    Alert.alert('Çok Yakında', `${feature} özelliği yakında gelecek!`);
  };

  // Günün motivasyon sözleri
  const motivationalQuote = "Değişim içeriden başlar. Bugün kendinize iyi bakın.";

  // Sahte terapi randevusu
  const nextAppointment = "Dr. Ayşe Yılmaz ile 15 Mart, 14:30";

  return (
    <UserLayout onNavigate={onNavigate}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Merhaba, {username}</Text>
            <Text style={styles.title}>İyi Hisset</Text>
            <Text style={styles.subtitle}>Zihinsel sağlığınız için bugün ne yapabilirsiniz?</Text>
          </View>

          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>"{motivationalQuote}"</Text>
          </View>

          <View style={styles.moodContainer}>
            <Text style={styles.moodTitle}>Bugün nasıl hissediyorsunuz?</Text>
            <View style={styles.moodSelector}>
              <TouchableOpacity
                style={[styles.moodButton, moodRating === 1 && styles.selectedMood]}
                onPress={() => handleMoodSelection(1)}
              >
                <Text style={styles.moodEmoji}>😔</Text>
                <Text style={styles.moodLabel}>Kötü</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moodButton, moodRating === 2 && styles.selectedMood]}
                onPress={() => handleMoodSelection(2)}
              >
                <Text style={styles.moodEmoji}>😐</Text>
                <Text style={styles.moodLabel}>Normal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moodButton, moodRating === 3 && styles.selectedMood]}
                onPress={() => handleMoodSelection(3)}
              >
                <Text style={styles.moodEmoji}>🙂</Text>
                <Text style={styles.moodLabel}>İyi</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moodButton, moodRating === 4 && styles.selectedMood]}
                onPress={() => handleMoodSelection(4)}
              >
                <Text style={styles.moodEmoji}>😊</Text>
                <Text style={styles.moodLabel}>Mutlu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.moodButton, moodRating === 5 && styles.selectedMood]}
                onPress={() => handleMoodSelection(5)}
              >
                <Text style={styles.moodEmoji}>😁</Text>
                <Text style={styles.moodLabel}>Harika</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.appointmentContainer}>
            <Text style={styles.sectionTitle}>Yaklaşan Randevunuz</Text>
            <View style={styles.appointmentCard}>
              <Text style={styles.appointmentIcon}>📅</Text>
              <View style={styles.appointmentDetails}>
                <Text style={styles.appointmentText}>{nextAppointment}</Text>
                <Text style={styles.appointmentSubtext}>Çevrimiçi Terapi Seansı</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Günlük Aktiviteler</Text>

          <TouchableOpacity
            style={[styles.featureButton, {backgroundColor: '#5B7FFF'}]}
            onPress={() => handleFeaturePress('Meditasyon')}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>🧘‍♀️</Text>
              <View>
                <Text style={styles.buttonText}>Günlük Meditasyon</Text>
                <Text style={styles.buttonSubtext}>5-10 dakika, rahatlamak için</Text>
              </View>
            </View>
            <Text style={styles.arrowIcon}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.featureButton, {backgroundColor: '#5E8B7E'}]}
            onPress={() => handleFeaturePress('Nefes Egzersizleri')}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>💨</Text>
              <View>
                <Text style={styles.buttonText}>Nefes Egzersizleri</Text>
                <Text style={styles.buttonSubtext}>Stres ve kaygıyı azaltın</Text>
              </View>
            </View>
            <Text style={styles.arrowIcon}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.featureButton, {backgroundColor: '#9C7FD7'}]}
            onPress={() => handleFeaturePress('Günlük')}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>📓</Text>
              <View>
                <Text style={styles.buttonText}>Duygu Günlüğü</Text>
                <Text style={styles.buttonSubtext}>Düşüncelerinizi kaydedin</Text>
              </View>
            </View>
            <Text style={styles.arrowIcon}>❯</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.featureButton, {backgroundColor: '#26A69A'}]}
            onPress={() => handleFeaturePress('İlerleme')}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonIcon}>📊</Text>
              <View>
                <Text style={styles.buttonText}>İlerleme Takibi</Text>
                <Text style={styles.buttonSubtext}>Gelişiminizi görün</Text>
              </View>
            </View>
            <Text style={styles.arrowIcon}>❯</Text>
          </TouchableOpacity>

          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Haftalık İstatistikler</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Meditasyon</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Günlük</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>Ruh Hali</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </UserLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#5F6368',
    marginBottom: 5,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#2D3A5F',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#5F6368',
    marginBottom: 5,
  },
  quoteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#5B7FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#4A6572',
    lineHeight: 24,
  },
  moodContainer: {
    marginBottom: 25,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3A5F',
    marginBottom: 15,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 12,
    color: '#5F6368',
  },
  selectedMood: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#5B7FFF',
  },
  appointmentContainer: {
    marginBottom: 25,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3A5F',
    marginBottom: 5,
  },
  appointmentSubtext: {
    fontSize: 14,
    color: '#5F6368',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3A5F',
    marginBottom: 15,
  },
  featureButton: {
    backgroundColor: '#5B7FFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  arrowIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  statsContainer: {
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5B7FFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#5F6368',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default UserScreen;