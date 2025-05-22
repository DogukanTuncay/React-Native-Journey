import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  accelerometer,      // İvmeölçer sensörü
  gyroscope,          // Jiroskop sensörü
  magnetometer,       // Manyetometre sensörü
  setUpdateIntervalForType, 
  SensorTypes 
} from 'react-native-sensors';

const ActivityTrackerScreen: React.FC<{ onNavigate: (screen: string) => void }> = ({ onNavigate }) => {
  // İvmeölçer verisi: cihazın X, Y, Z eksenlerindeki hızlanma kuvveti
  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
  
  // Jiroskop verisi: cihazın X, Y, Z eksenlerindeki açısal dönme hızı
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
  
  // Manyetometre verisi: cihazın etrafındaki manyetik alanın X, Y, Z bileşenleri
  const [magnetData, setMagnetData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // Her sensörün güncelleme aralığını milisaniye cinsinden ayarlıyoruz.
    // 200 ms, 5 defa/saniye güncelleme demek.
    setUpdateIntervalForType(SensorTypes.accelerometer, 200);
    setUpdateIntervalForType(SensorTypes.gyroscope, 200);
    setUpdateIntervalForType(SensorTypes.magnetometer, 200);

    // Accelerometer aboneliği: her 200 ms'de bir hızlanma değerlerini alır
    const accelSubscription = accelerometer.subscribe(({ x, y, z }) => {
      setAccelData({ x, y, z });
    });

    // Gyroscope aboneliği: cihazın dönme hızını alır
    const gyroSubscription = gyroscope.subscribe(({ x, y, z }) => {
      setGyroData({ x, y, z });
    });

    // Magnetometer aboneliği: manyetik alan verisini alır
    const magnetSubscription = magnetometer.subscribe(({ x, y, z }) => {
      setMagnetData({ x, y, z });
    });

    // Temizlik: bileşen unmount olduğunda abonelikler iptal edilir
    return () => {
      accelSubscription.unsubscribe();
      gyroSubscription.unsubscribe();
      magnetSubscription.unsubscribe();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sensör Verileri</Text>

      {/* Accelerometer verileri */}
      <Text style={styles.sectionTitle}>Accelerometer (İvmeölçer)</Text>
      <Text>X: <Text style={styles.value}>{accelData.x.toFixed(2)}</Text></Text>
      <Text>Y: <Text style={styles.value}>{accelData.y.toFixed(2)}</Text></Text>
      <Text>Z: <Text style={styles.value}>{accelData.z.toFixed(2)}</Text></Text>
      <Text style={styles.description}>
        İvmeölçer cihazın hareket hızındaki değişimleri ölçer. Yani cihazın ne kadar hızlı hızlandığını veya yavaşladığını anlar.
      </Text>

      {/* Gyroscope verileri */}
      <Text style={styles.sectionTitle}>Gyroscope (Jiroskop)</Text>
      <Text>X: <Text style={styles.value}>{gyroData.x.toFixed(2)}</Text></Text>
      <Text>Y: <Text style={styles.value}>{gyroData.y.toFixed(2)}</Text></Text>
      <Text>Z: <Text style={styles.value}>{gyroData.z.toFixed(2)}</Text></Text>
      <Text style={styles.description}>
        Jiroskop cihazın kendi etrafında dönme hızını ölçer. Telefonun sağa, sola veya yukarı-aşağı dönmesini algılar.
      </Text>

      {/* Magnetometer verileri */}
      <Text style={styles.sectionTitle}>Magnetometer (Manyetometre)</Text>
      <Text>X: <Text style={styles.value}>{magnetData.x.toFixed(2)}</Text></Text>
      <Text>Y: <Text style={styles.value}>{magnetData.y.toFixed(2)}</Text></Text>
      <Text>Z: <Text style={styles.value}>{magnetData.z.toFixed(2)}</Text></Text>
      <Text style={styles.description}>
        Manyetometre cihazın çevresindeki manyetik alanı ölçer. Genellikle pusula olarak kullanılır, yönünüzü bulmaya yardımcı olur.
      </Text>

      {/* Ana Sayfa'ya Dön Butonu */}
      <TouchableOpacity style={styles.homeButton} onPress={() => onNavigate('Welcome')}>
        <Text style={styles.homeButtonText}>Ana Sayfa'ya Dön</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D3A5F',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: '#007AFF',
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    marginBottom: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  homeButton: {
    marginTop: 30,
    backgroundColor: '#5B7FFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActivityTrackerScreen;
