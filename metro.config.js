/**
 * Metro Bundler Konfigürasyonu
 * https://facebook.github.io/metro/docs/configuration
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // Detaylı loglama
  reporter: {
    update: (event) => {
      if (event.type === 'bundle_build_started') {
        console.log(`[METRO] Bundle build başladı - ${event.bundleDetails.entryFile}`);
      }
      if (event.type === 'bundle_build_done') {
        console.log(`[METRO] Bundle build tamamlandı - ${event.bundleDetails.entryFile} - ${event.bundleDetails.bundleType}`);
      }
      if (event.type === 'bundle_transform_progressed') {
        console.log(`[METRO] Dönüştürme ilerleme - ${Math.round(event.transformedFileCount / event.totalFileCount * 100)}%`);
      }
      if (event.type === 'dep_graph_loading') {
        console.log('[METRO] Bağımlılık grafiği yükleniyor');
      }
      if (event.type === 'dep_graph_loaded') {
        console.log('[METRO] Bağımlılık grafiği yüklendi');
      }
      if (event.type === 'global_cache_error') {
        console.error('[METRO] Global önbellek hatası:', event.error);
      }
      if (event.type === 'global_cache_disabled') {
        console.log('[METRO] Global önbellek devre dışı');
      }
    }
  },
  // İş parçacığı sayısı
  maxWorkers: 3, 
  // Ayrıntılı hata mesajları
  verbose: true
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
