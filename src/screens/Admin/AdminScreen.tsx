import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from 'react-native';

const AdminScreen = ({ onNavigate }) => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Örnek veriler
  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@mail.com', role: 'Kullanıcı', status: 'Aktif' },
    { id: 2, name: 'Ayşe Demir', email: 'ayse@mail.com', role: 'Admin', status: 'Aktif' },
    { id: 3, name: 'Mehmet Kaya', email: 'mehmet@mail.com', role: 'Kullanıcı', status: 'Pasif' },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Kullanıcı',
    status: 'Aktif'
  });

  const stats = {
    totalUsers: 1284,
    activeUsers: 892,
    totalSessions: 3567,
    averageRating: 4.8
  };

  const handleLogout = () => {
    onNavigate('Welcome');
  };
// Sıralama için yeni state'ler
const [sortField, setSortField] = useState('name'); // Varsayılan sıralama alanı
const [sortDirection, setSortDirection] = useState('asc'); // 'asc' veya 'desc'

// Sıralama fonksiyonu
const handleSort = (field) => {
  // Aynı alana tıklandığında yön değişir
  if (field === sortField) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortField(field);
    setSortDirection('asc');
  }
};
// Sıralama işlemi
const getSortedUsers = (users) => {
  return [...users].sort((a, b) => {
    let compareA = a[sortField]?.toLowerCase?.() || '';
    let compareB = b[sortField]?.toLowerCase?.() || '';
    
    if (sortField === 'status') {
      // Özel durum sıralaması (Aktif üstte)
      compareA = a.status === 'Aktif' ? 0 : 1;
      compareB = b.status === 'Aktif' ? 0 : 1;
    }

    if (compareA < compareB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (compareA > compareB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id: newId }]);
    setNewUser({ name: '', email: '', role: 'Kullanıcı', status: 'Aktif' });
    Alert.alert('Başarılı', 'Kullanıcı eklendi');
  };

  const handleDeleteUser = (id) => {
    Alert.alert(
      'Onay',
      'Bu kullanıcıyı silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          onPress: () => {
            setUsers(users.filter(user => user.id !== id));
            Alert.alert('Başarılı', 'Kullanıcı silindi');
          }
        }
      ]
    );
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    ));
    setModalVisible(false);
    setSelectedUser(null);
    Alert.alert('Başarılı', 'Kullanıcı güncellendi');
  };

  const renderDashboard = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalUsers}</Text>
          <Text style={styles.statLabel}>Toplam Kullanıcı</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.activeUsers}</Text>
          <Text style={styles.statLabel}>Aktif Kullanıcı</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>Toplam Seans</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.averageRating}</Text>
          <Text style={styles.statLabel}>Ort. Puan</Text>
        </View>
      </View>
    </View>
  );

  const renderUserManagement = () => {
    const filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || 
                          (filterStatus === 'active' && user.status === 'Aktif') ||
                          (filterStatus === 'passive' && user.status === 'Pasif');
      return matchesSearch && matchesFilter;
    });
    const sortedUsers = getSortedUsers(filteredUsers);
    return (
      <View style={styles.tabContent}>
        {/* Filtreleme Butonları */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filterStatus === 'all' && styles.activeFilter]}
            onPress={() => setFilterStatus('all')}>
            <Text style={styles.filterButtonText}>Tümü</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterStatus === 'active' && styles.activeFilter]}
            onPress={() => setFilterStatus('active')}>
            <Text style={styles.filterButtonText}>Aktif</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filterStatus === 'passive' && styles.activeFilter]}
            onPress={() => setFilterStatus('passive')}>
            <Text style={styles.filterButtonText}>Pasif</Text>
          </TouchableOpacity>
        </View>

        {/* Yeni Kullanıcı Ekleme Formu */}
        <View style={styles.addUserForm}>
        <TextInput
    style={styles.input}
    placeholder="İsim"
    value={newUser.name}
    onChangeText={(text) => setNewUser({...newUser, name: text})}
    autoCorrect={false}
    autoCapitalize="words"
    keyboardType="default"
    textContentType="name"
  />
  <TextInput
    style={styles.input}
    placeholder="E-posta"
    value={newUser.email}
    onChangeText={(text) => setNewUser({...newUser, email: text})}
    autoCorrect={false}
    autoCapitalize="none"
    keyboardType="email-address"
    textContentType="emailAddress"
  />
  <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
    <Text style={styles.addButtonText}>Kullanıcı Ekle</Text>
  </TouchableOpacity>
        </View>

        {/* Kaydırılabilir Tablo */}
        <View style={styles.tableContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          <View>
            {/* Tablo Başlığı */}
            <View style={styles.tableHeader}>
                <TouchableOpacity 
                  style={[styles.headerCell, styles.headerTouchable]}
                  onPress={() => handleSort('name')}>
                  <Text style={styles.headerText}>İsim</Text>
                  {sortField === 'name' && (
                    <Text style={styles.sortIndicator}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.headerCell, styles.headerTouchable]}
                  onPress={() => handleSort('email')}>
                  <Text style={styles.headerText}>E-posta</Text>
                  {sortField === 'email' && (
                    <Text style={styles.sortIndicator}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.headerCell, styles.headerTouchable]}
                  onPress={() => handleSort('status')}>
                  <Text style={styles.headerText}>Durum</Text>
                  {sortField === 'status' && (
                    <Text style={styles.sortIndicator}>
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </Text>
                  )}
                </TouchableOpacity>
                <View style={styles.headerCell}>
                  <Text style={styles.headerText}>İşlemler</Text>
                </View>
              </View>

            {/* Tablo İçeriği */}
            <ScrollView style={styles.tableBody}>
            {sortedUsers.map(user => (
                <View key={user.id} style={styles.tableRow}>
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{user.name}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={styles.cellText}>{user.email}</Text>
                  </View>
                  <View style={styles.tableCell}>
                    <Text style={[
                      styles.statusText,
                      user.status === 'Aktif' ? styles.activeStatus : styles.passiveStatus
                    ]}>
                      {user.status}
                    </Text>
                  </View>
                  <View style={styles.tableCell}>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => {
                          setSelectedUser(user);
                          setModalVisible(true);
                        }}>
                        <Text style={styles.buttonText}>Düzenle</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => handleDeleteUser(user.id)}>
                        <Text style={styles.buttonText}>Sil</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>


        {/* Düzenleme Modalı */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Kullanıcı Düzenle</Text>
              <TextInput
        style={styles.input}
        placeholder="İsim"
        value={selectedUser?.name || ''}
        onChangeText={(text) => setSelectedUser({...selectedUser, name: text})}
        autoCorrect={false}
        autoCapitalize="words"
        keyboardType="default"
        textContentType="name"
      />
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={selectedUser?.email || ''}
        onChangeText={(text) => setSelectedUser({...selectedUser, email: text})}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
       {/* Durum Seçimi */}
       <View style={styles.statusSelector}>
        <Text style={styles.statusLabel}>Durum:</Text>
        <View style={styles.statusButtons}>
          <TouchableOpacity 
            style={[
              styles.statusButton, 
              selectedUser?.status === 'Aktif' && styles.statusButtonActive
            ]}
            onPress={() => setSelectedUser({...selectedUser, status: 'Aktif'})}>
            <Text style={[
              styles.statusButtonText,
              selectedUser?.status === 'Aktif' && styles.statusButtonTextActive
            ]}>Aktif</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.statusButton, 
              selectedUser?.status === 'Pasif' && styles.statusButtonActive
            ]}
            onPress={() => setSelectedUser({...selectedUser, status: 'Pasif'})}>
            <Text style={[
              styles.statusButtonText,
              selectedUser?.status === 'Pasif' && styles.statusButtonTextActive
            ]}>Pasif</Text>
          </TouchableOpacity>
        </View>
      </View>
      
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleUpdateUser}>
                  <Text style={styles.buttonText}>Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const renderContent = () => {
    switch(selectedTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUserManagement();
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

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'dashboard' && styles.selectedTab]}
          onPress={() => setSelectedTab('dashboard')}>
          <Text style={[styles.tabText, selectedTab === 'dashboard' && styles.selectedTabText]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'users' && styles.selectedTab]}
          onPress={() => setSelectedTab('users')}>
          <Text style={[styles.tabText, selectedTab === 'users' && styles.selectedTabText]}>
            Kullanıcılar
          </Text>
        </TouchableOpacity>
      </View>

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
  searchContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
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
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#5B7FFF',
  },
  filterButtonText: {
    color: '#2D3A5F',
  },
  addUserForm: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  userList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  userListHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerCell: {
    fontWeight: '600',
    color: '#2D3A5F',
  },
  userRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  userCell: {
    color: '#6C757D',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#5B7FFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3A5F',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#6C757D',
  },
  saveButton: {
    backgroundColor: '#5B7FFF',
  },
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerCell: {
    width: 150, // Sabit genişlik
    padding: 12,
    justifyContent: 'center',
  },
  headerTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20, // Ok işareti için yer
  },
  sortIndicator: {
    marginLeft: 5,
    fontSize: 14,
    color: '#2D3A5F',
  },
  headerCell: {
    width: 150,
    padding: 12,
    backgroundColor: '#F8F9FA',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3A5F',
  },
  tableCell: {
    width: 150, // Başlıkla aynı genişlikte
    padding: 12,
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3A5F',
  },
  cellText: {
    fontSize: 14,
    color: '#6C757D',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeStatus: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  passiveStatus: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#5B7FFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  tableBody: {
    maxHeight: 400, // veya istediğiniz bir yükseklik
  },
  statusSelector: {
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 14,
    color: '#2D3A5F',
    marginBottom: 8,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#5B7FFF',
    borderColor: '#5B7FFF',
  },
  statusButtonText: {
    color: '#6C757D',
    fontSize: 14,
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: '#FFFFFF',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
  },
});

export default AdminScreen;