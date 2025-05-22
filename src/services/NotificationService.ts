/**
 * NotificationService.ts
 * Bu servis, local bildirimler ve OneSignal bildirimlerini yönetir.
 */

// Yorumları kaldırıyoruz
import PushNotification from 'react-native-push-notification';
// OneSignal için doğru import - 4.5.1 sürümü için
import OneSignal from 'react-native-onesignal';
import { Alert, Platform, Linking } from 'react-native';

/**
 * Local ve OneSignal bildirimlerini yapılandırma ve yönetme servisi
 */
class NotificationService {
  private static instance: NotificationService;
  private initialized: boolean = false;
  private oneSignalInitialized: boolean = false;
  private playerId: string = ''; // OneSignal player_id

  // Singleton örneği oluşturma
  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      console.log('[NotificationService] Yeni instance oluşturuluyor');
      NotificationService.instance = new NotificationService();
    } else {
      console.log('[NotificationService] Mevcut instance döndürülüyor');
    }
    return NotificationService.instance;
  }

  /**
   * Local bildirimleri başlatır ve yapılandırır
   */
  public initLocalNotifications = (): void => {
    if (this.initialized) {
      console.log('[NotificationService] Local bildirimler zaten başlatılmış');
      return;
    }

    console.log('[NotificationService] Local bildirimler başlatılıyor...');
    console.log('[NotificationService] Platform:', Platform.OS, Platform.Version);

    // Kütüphaneler aktif
    PushNotification.configure({
      // Bildirim alındığında
      onNotification: function (notification) {
        console.log('[NotificationService] BİLDİRİM ALINDI:', JSON.stringify(notification));
      },
      // Bildirim izinleri (iOS için)
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios', // Android için ayrıca izin isteyeceğiz
    });

    console.log('[NotificationService] PushNotification.configure tamamlandı');

    // Android için kanal oluşturma
    if (Platform.OS === 'android') {
      console.log('[NotificationService] Android kanal oluşturuluyor');
      PushNotification.createChannel(
        {
          channelId: 'default-channel-id',
          channelName: 'Varsayılan Kanal',
          channelDescription: 'Uygulama varsayılan bildirim kanalı',
          playSound: true,
          soundName: 'default',
          importance: 4, // High importance
          vibrate: true,
        },
        (created) => console.log(`[NotificationService] Kanal oluşturuldu: '${created}'`)
      );

      // Android 13+ için izinleri kontrol et
      this.checkNotificationPermission();
    }

    this.initialized = true;
    console.log('[NotificationService] Local bildirimler başlatma tamamlandı');
  };

  /**
   * Android 13+ için bildirim izinlerini kontrol eder ve gerekirse izin ister
   */
  private checkNotificationPermission = async (): Promise<void> => {
    if (Platform.OS !== 'android') return;
    
    try {
      console.log('[NotificationService] Android bildirim izinleri kontrol ediliyor. Platform.Version:', Platform.Version);
      
      // Android 13+ (API 33+) için özel izin kontrolü
      if (Platform.Version >= 33) {
        console.log('[NotificationService] Android 13+ (API 33+) için izin kontrolü');
        PushNotification.checkPermissions((permissions) => {
          console.log('[NotificationService] İzin durumu:', JSON.stringify(permissions));
          if (!permissions.alert) {
            console.log('[NotificationService] Bildirim izni yok, izin isteniyor');
            Alert.alert(
              'Bildirim İzni',
              'Bildirimleri alabilmek için izin vermeniz gerekiyor.',
              [
                {
                  text: 'İptal',
                  style: 'cancel',
                  onPress: () => console.log('[NotificationService] İzin isteği reddedildi')
                },
                {
                  text: 'Ayarları Aç',
                  onPress: () => {
                    console.log('[NotificationService] Ayarlar açılıyor');
                    Linking.openSettings();
                  },
                },
              ]
            );
          } else {
            console.log('[NotificationService] Bildirim izni mevcut');
          }
        });
      } else {
        console.log('[NotificationService] Android < 13, ek izin kontrolü gerekmiyor');
      }
    } catch (error) {
      console.error('[NotificationService] Bildirim izni kontrol hatası:', error);
    }
  };

  /**
   * OneSignal bildirimlerini başlatır ve yapılandırır
   * @param appId OneSignal uygulama ID'si
   */
  public initOneSignal = (appId: string): void => {
    if (this.oneSignalInitialized) {
      console.log('[NotificationService] OneSignal zaten başlatılmış');
      return;
    }

    console.log('[NotificationService] OneSignal bildirimleri başlatılıyor... AppID:', appId);

    try {
      console.log('[NotificationService] OneSignal öncesi: ', OneSignal ? 'tanımlı' : 'tanımlı değil');
      
      if (!OneSignal) {
        throw new Error('OneSignal modülü tanımlı değil');
      }

      // Erişim kontrolü
      console.log('[NotificationService] OneSignal özellikleri:', Object.keys(OneSignal));
      
      // OneSignal 4.x sürümü için debug log seviyesi
      OneSignal.setLogLevel(6, 0);
      
      console.log('[NotificationService] OneSignal.init çağrılıyor');
      // OneSignal SDK'yı başlat (4.5.1 sürümü)
      OneSignal.setAppId(appId);
      console.log('[NotificationService] OneSignal başlatıldı');
      
      // Bildirim izinleri isteme (4.5.1 sürümü)
      console.log('[NotificationService] Bildirim izni isteniyor');
      // iOS için provisional bildirim izni etkinleştirme (isteğe bağlı)
      if (Platform.OS === 'ios') {
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
          console.log('[NotificationService] Bildirim izni cevabı:', response);
        });
      }
      
      // Bildirim açma olayını dinle (4.5.1 sürümü)
      console.log('[NotificationService] Bildirim açma olayı dinleyicisi ekleniyor');
      OneSignal.setNotificationOpenedHandler((openResult) => {
        console.log('[NotificationService] Bildirim tıklandı:', JSON.stringify(openResult));
      });
      
      // Bildirim alındığında dinleyici
      OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
        console.log('[NotificationService] Bildirim alındı:', JSON.stringify(notificationReceivedEvent));
        // Ön planda bildirim göstermek istiyorsak
        notificationReceivedEvent.complete(notificationReceivedEvent.getNotification());
      });
      
      // Player ID'yi alalım
      console.log('[NotificationService] Player ID alınıyor');
      setTimeout(() => {
        this.getPlayerId();
      }, 2000); // OneSignal başlatıldıktan bir süre sonra ID'yi almaya çalış
      
      this.oneSignalInitialized = true;
      console.log('[NotificationService] OneSignal başlatma tamamlandı');
    } catch (error) {
      console.error('[NotificationService] OneSignal başlatma hatası:', error);
      console.error('[NotificationService] Hata stack:', error.stack);
      
      if (error instanceof Error) {
        console.error('[NotificationService] Hata mesajı:', error.message);
      }
      
      // OneSignal Modülü kontrolü
      console.log('[NotificationService] OneSignal modül tipi:', typeof OneSignal);
      console.log('[NotificationService] OneSignal modül içeriği:', JSON.stringify(OneSignal));
    }
  };

  /**
   * OneSignal Player ID'yi alır
   */
  public getPlayerId = async (): Promise<string> => {
    try {
      if (!this.oneSignalInitialized) {
        console.warn('[NotificationService] OneSignal henüz başlatılmadı!');
        return '';
      }
  
      console.log('[NotificationService] OneSignal Player ID alma girişimi');
      try {
        // 4.5.1 sürümü için player ID alma
        const deviceState = await OneSignal.getDeviceState();
        console.log('[NotificationService] DeviceState:', JSON.stringify(deviceState));
        
        if (deviceState && deviceState.userId) {
          this.playerId = deviceState.userId;
          console.log('[NotificationService] OneSignal Player ID:', this.playerId);
          return this.playerId;
        }
        
        console.log('[NotificationService] Player ID alınamadı');
        return '';
      } catch (error) {
        console.error('[NotificationService] Player ID alma hatası:', error);
        if (error instanceof Error) {
          console.error('[NotificationService] Hata detayları:', error.message);
          console.error('[NotificationService] Hata stack:', error.stack);
        }
        return '';
      }
    } catch (error) {
      console.error('[NotificationService] Player ID alma hatası (dış):', error);
      return '';
    }
  };

  /**
   * Mevcut OneSignal Player ID'yi döndürür
   */
  public getCurrentPlayerId = (): string => {
    return this.playerId;
  };

  /**
   * Local bildirim gönderir
   * @param title Bildirim başlığı
   * @param message Bildirim mesajı
   */
  public sendLocalNotification = (title: string, message: string): void => {
    if (!this.initialized) {
      console.warn('[NotificationService] Local bildirimler başlatılmamış! Bildirimi gönderemiyorum.');
      return;
    }

    console.log('[NotificationService] Local bildirim gönderiliyor: ', title, message);

    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title: title,
      message: message,
      playSound: true,
      soundName: 'default',
      importance: 'high',
      vibrate: true,
    });
  };
}

export default NotificationService; 