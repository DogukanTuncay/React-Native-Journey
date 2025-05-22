import React,{ useEffect,useState } from 'react';
import { View,Button,Text,StyleSheet,Alert,TouchableOpacity,ScrollView,Linking,Platform } from 'react-native';
import NotificationService from '../services/NotificationService';
// PushNotification ve OneSignal doğrudan burada kullanmıyoruz,NotificationService üzerinden kullanıyoruz

const ONESIGNAL_APP_ID = '8e61b920-a22c-444f-8e3b-586735a1c37a'; // Mevcut OneSignal App ID

const NotificationTestScreen: React.FC = () => {
  // Bildirim servisini oluştur
  const notificationService = NotificationService.getInstance();
  // Player ID için state
  const [playerId,setPlayerId] = useState<string>('');

  // Sepet için state (görsel amaçlı)
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    // Bildirim servislerini başlat
    const initNotifications = async () => {
      try {
        notificationService.initLocalNotifications();
        notificationService.initOneSignal(ONESIGNAL_APP_ID);
        
        // Player ID'yi al
        const id = await notificationService.getPlayerId();
        setPlayerId(id);
        
        // Başlangıç uyarısı
        Alert.alert('Bildirim Test Ekranı','Bu ekranda bildirim testleri yapabileceksiniz.');
      } catch (error) {
        console.error('Bildirim başlatma hatası:',error);
      }
    };

    initNotifications();
  },[notificationService]);

  // Player ID'yi yeniden alır
  const refreshPlayerId = async () => {
    try {
      const id = await notificationService.getPlayerId();
      setPlayerId(id);
      Alert.alert('Bilgi','Player ID yenilendi. İd : ' + id);
    } catch (error) {
      console.error('Player ID yenileme hatası:',error);
    }
  };

  // Bildirim ayarlarını açar
  const openNotificationSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      // iOS için Ayarlar:Bildirimler'e yönlendirme
      Linking.openURL('app-settings:notification');
    }
  };

  // Local bildirim gönderme fonksiyonu
  const localBildirimGonder = () => {
    try {
      // Bildirim servisini kullan
      notificationService.sendLocalNotification(
        'Yerel Bildirim',
        'Bu bir local bildirimin örneğidir!'
      );
    } catch (error) {
      console.error('Bildirim gönderme hatası:',error);
      Alert.alert('Hata','Bildirim gönderilirken bir hata oluştu');
    }
  };

  // Sepete ekle fonksiyonu
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    try {
      notificationService.sendLocalNotification(
        'Sepete Eklendi',
        'Ürün başarıyla sepete eklendi!'
      );
    } catch (error) {
      Alert.alert('Hata','Bildirim gönderilemedi');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Ürün Kartı */}
        <View style={styles.productCard}>
          <Text style={styles.productImage}>🍫</Text>
          <View style={{alignItems:'center'}}>
            <Text style={styles.productTitle}>Sütlü Çikolata</Text>
            <Text style={styles.productPrice}>₺39,90</Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Sepete Ekle</Text>
          </TouchableOpacity>
          <Text style={styles.cartInfo}>Sepette: {cartCount}</Text>
        </View>
        
        <Button title="Local Bildirim Gönder" onPress={localBildirimGonder} />
        
        <View style={styles.playerIdContainer}>
          <Text style={styles.subtitle}>OneSignal Player ID:</Text>
          <Text style={styles.playerIdText} selectable={true}>
            {playerId || 'Player ID yükleniyor...'}
          </Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={refreshPlayerId}
          >
            <Text style={styles.refreshButtonText}>Player ID'yi Yenile</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.info}>
          OneSignal bildirimleri sunucudan gönderebilirsin.
        </Text>
        
        <Text style={styles.notificationHelp}>
          Bildirimler gelmiyorsa şunları kontrol edin:
        </Text>
        
        <View style={styles.helpList}>
          <Text style={styles.helpItem}>
            • Android 13+ için "Ayarlar &gt; Uygulamalar &gt; React Native Journey &gt; Bildirimler" izinlerini kontrol edin
          </Text>
          <Text style={styles.helpItem}>
            • Uygulama arka planda çalışıyor olmalıdır
          </Text>
          <Text style={styles.helpItem}>
            • OneSignal Dashboard'dan test bildirimleri gönderirken Player ID'yi kullanın
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={openNotificationSettings}
        >
          <Text style={styles.settingsButtonText}>Bildirim İzinlerini Aç</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20 
  },
  title: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20 
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  playerIdContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  playerIdText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#0066CC',
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    backgroundColor: '#FFF',
    width: '100%',
    marginBottom: 10
  },
  refreshButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginTop: 5
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  info: { 
    marginTop: 10,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20 
  },
  notificationHelp: {
    fontWeight: 'bold',
    color: '#FF3D00',
    marginTop: 10
  },
  helpList: {
    alignSelf: 'flex-start',
    marginTop: 10,
    width: '100%'
  },
  helpItem: {
    marginBottom: 8,
    color: '#666'
  },
  settingsButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center'
  },
  settingsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center'
  },
  productImage: {
    fontSize: 48,
    marginBottom: 10
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  productPrice: {
    fontSize: 16,
    color: '#666'
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center'
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  cartInfo: {
    marginTop: 10,
    color: '#666'
  }
});

export default NotificationTestScreen; 