# Bildirim Kurulum Rehberi

Bu rehber, React Native projesine local ve OneSignal bildirimlerini eklemek için adım adım talimatlar içerir.

## 1. Gerekli Paketlerin Kurulumu

```bash
npm install react-native-push-notification @types/react-native-push-notification react-native-onesignal@4.5.1
```

## 2. Android Kurulumu

### Android Manifest Ayarlamaları

`android/app/src/main/AndroidManifest.xml` dosyasında şu izinlerin olduğundan emin olun:

```xml
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

Ve `<application>` etiketinin içinde:

```xml
<!-- Bildirim alıcısı -->
<meta-data android:name="com.dieam.reactnativepushnotification.notification_foreground" android:value="false" />
<meta-data android:name="com.dieam.reactnativepushnotification.notification_color" android:resource="@color/white" />

<!-- OneSignal Ayarlamaları -->
<meta-data android:name="com.onesignal.NotificationAccentColor" android:value="#FF9500" />
```

### colors.xml Oluşturun

Eğer `@color/white` bulunamıyorsa, `android/app/src/main/res/values/colors.xml` dosyasını oluşturun veya güncelleyin:

```xml
<resources>
    <color name="white">#FFFFFF</color>
</resources>
```

## 3. Yorum Satırlarını Kaldırma

Kurulumları tamamladıktan sonra:

1. `src/services/NotificationService.ts` dosyasındaki yorum satırlarını kaldırın.
2. `src/screens/NotificationTestScreen.tsx` dosyasında gerekli import'ların yorum satırlarını kaldırın.

## 4. OneSignal App ID

Kendi OneSignal hesabınızdan aldığınız App ID'yi `NotificationService.ts` ve `NotificationTestScreen.tsx` dosyalarında `ONESIGNAL_APP_ID` değişkenine atayın.

## 5. iOS için Ek Ayarlar

iOS için aşağıdaki adımları takip edin:

1. `ios/` klasörüne gidin ve `pod install` komutunu çalıştırın.
2. `Info.plist` dosyasında bildirim izinlerini ekleyin:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>
```

3. Xcode'da Bildirim İzinlerini ekleyin:
   - Xcode'da projenizi açın
   - Targets > Your App > Signing & Capabilities > + Capability
   - "Push Notifications" ekleyin
   - "Background Modes" ekleyin ve "Remote notifications" seçeneğini işaretleyin

4. iOS için Notification Service Extension ekleyin (zengin bildirimler ve onaylanmış gönderim için gerekli):
   - Xcode'da File > New > Target > Notification Service Extension seçin
   - "OneSignalNotificationServiceExtension" adını verin
   - OneSignal dokümantasyonunda belirtilen kodu ekleyin

## OneSignal 4.5.1 Sürümü Özellikleri

Bu proje, OneSignal'ın 4.5.1 sürümünü kullanmaktadır. Bu sürüm şunları içerir:

- Bildirim izinleri yönetimi (`promptForPushNotificationsWithUserResponse`)
- Bildirim alımı ve tıklaması için olay işleyicileri
- Player ID alma (`getDeviceState().userId`)
- iOS ve Android platformlarında desteklenen tüm özellikler

## Sorun Giderme

- Eğer Android bildirimleri çalışmıyorsa, uygulama ayarlarından bildirim izinlerini kontrol edin.
- iOS'ta bildirimler gelmiyorsa, bildirim izinlerini kabul ettiğinizden emin olun.
- OneSignal panelini ve dokümantasyonu takip edin: [OneSignal Docs](https://documentation.onesignal.com/docs/react-native-sdk-setup)

## Test

1. Uygulamayı başlatın.
2. "Bildirim Testi" ekranına gidin.
3. "Local Bildirim Gönder" butonuna basarak yerel bildirim gönderin.
4. OneSignal Panel üzerinden bir bildirim göndererek uzaktan bildirimleri test edin. 