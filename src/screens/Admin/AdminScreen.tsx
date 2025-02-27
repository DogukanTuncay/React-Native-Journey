import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';

const AdminScreen = ({ onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    onNavigate('Welcome');
  };

  const handleAction = (action) => {
    Alert.alert('Bilgi', `${action} işlemi yakında eklenecek!`);
  };

  // Örnek veriler
  const stats = {
    totalUsers: 1284,
    activeUsers: 892,
    totalSessions: 3567,
    averageRating: 4.8
  };

  const recentUsers = [
    { id: 1, name: 'Ahmet Yılmaz', status: 'active', lastSeen: '2 dk önce' },
    { id: 2, name: 'Ayşe Demir', status: 'inactive', lastSeen: '1 saat önce' },
    { id: 3, name: 'Mehmet Kaya', status: 'active', lastSeen: '5 dk önce' },
  ];

  const appointments = [
    { id: 1, patient: 'Can Öztürk', doctor: 'Dr. Ayşe Yılmaz', time: '14:30', date: '15 Mart' },
    { id: 2, patient: 'Zeynep Ak', doctor: 'Dr. Mehmet Akkaya', time: '15:45', date: '15 Mart' },
    { id: 3, patient: 'Ali Veli', doctor: 'Dr. Ayşe Yılmaz', time: '16:00', date: '15 Mart' },
  ];

  const renderDashboard = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalUsers}</Text>
          <Text style={styles.statLabel}>Toplam Kullanıcı</Text>
          <Text style={styles.statChange}>+24 bu ay</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.activeUsers}</Text>
          <Text style={styles.statLabel}>Aktif Kullanıcı</Text>
          <Text style={styles.statChange}>+12 bu hafta</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>Toplam Seans</Text>
          <Text style={styles.statChange}>+156 bu ay</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.averageRating}</Text>
          <Text style={styles.statLabel}>Ort. Puan</Text>
          <Text style={styles.statChange}>+0.2 bu ay</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Günlük Randevular</Text>
          <TouchableOpacity onPress={() => handleAction('Tüm randevuları görüntüle')}>
            <Text style={styles.seeAllButton}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        {appointments.map(appointment => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentTime}>
                {appointment.time} - {appointment.date}
              </Text>
              <Text style={styles.appointmentName}>{appointment.patient}</Text>
              <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
            </View>
            <TouchableOpacity
              style={styles.appointmentAction}
              onPress={() => handleAction('Randevu detayları')}
            >
              <Text style={styles.appointmentActionText}>Detaylar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son Kullanıcılar</Text>
          <TouchableOpacity onPress={() => handleAction('Tüm kullanıcıları görüntüle')}>
            <Text style={styles.seeAllButton}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>
        {recentUsers.map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStatus}>
                <Text style={[
                  styles.statusDot,
                  { color: user.status === 'active' ? '#4CAF50' : '#FF5722' }
                ]}>●</Text>
                {user.status === 'active' ? 'Aktif' : 'Pasif'} - {user.lastSeen}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.userAction}
              onPress={() => handleAction('Kullanıcı detayları')}
            >
              <Text style={styles.userActionText}>Profil</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderContent = () => {
    switch(selectedTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
      case 'appointments':
      case 'content':
      case 'reports':
        return (
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonText}>Bu bölüm yakında eklenecek!</Text>
          </View>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Admin Paneli</Text>
          <Text style={styles.headerSubtitle}>Hoş geldiniz, Admin</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

   {/*   <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'dashboard' && styles.selectedTab]}
          onPress={() => setSelectedTab('dashboard')}
        >
          <Text style={[styles.tabText, selectedTab === 'dashboard' && styles.selectedTabText]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'users' && styles.selectedTab]}
          onPress={() => setSelectedTab('users')}
        >
          <Text style={[styles.tabText, selectedTab === 'users' && styles.selectedTabText]}>
            Kullanıcılar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'appointments' && styles.selectedTab]}
          onPress={() => setSelectedTab('appointments')}
        >
          <Text style={[styles.tabText, selectedTab === 'appointments' && styles.selectedTabText]}>
            Randevular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'content' && styles.selectedTab]}
          onPress={() => setSelectedTab('content')}
        >
          <Text style={[styles.tabText, selectedTab === 'content' && styles.selectedTabText]}>
            İçerik
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'reports' && styles.selectedTab]}
          onPress={() => setSelectedTab('reports')}
        >
          <Text style={[styles.tabText, selectedTab === 'reports' && styles.selectedTabText]}>
            Raporlar
          </Text>
        </TouchableOpacity>
      </ScrollView> */}

      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3A5F',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  searchInput: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  selectedTab: {
    backgroundColor: '#5B7FFF',
  },
  tabText: {
    color: '#6C757D',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3A5F',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 5,
  },
  statChange: {
    fontSize: 12,
    color: '#4CAF50',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3A5F',
  },
  seeAllButton: {
    color: '#5B7FFF',
    fontSize: 14,
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#5B7FFF',
    fontWeight: '500',
    marginBottom: 4,
  },
  appointmentName: {
    fontSize: 16,
    color: '#2D3A5F',
    fontWeight: '500',
    marginBottom: 2,
  },
  appointmentDoctor: {
    fontSize: 14,
    color: '#6C757D',
  },
  appointmentAction: {
    backgroundColor: '#E9ECEF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  appointmentActionText: {
    color: '#2D3A5F',
    fontSize: 12,
    fontWeight: '500',
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: '#2D3A5F',
    fontWeight: '500',
    marginBottom: 2,
  },
  userStatus: {
    fontSize: 14,
    color: '#6C757D',
  },
  statusDot: {
    marginRight: 5,
  },
  userAction: {
    backgroundColor: '#E9ECEF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  userActionText: {
    color: '#2D3A5F',
    fontSize: 12,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
  },
});

export default AdminScreen;