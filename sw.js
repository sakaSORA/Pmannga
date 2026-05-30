const CACHE_NAME = 'manga-prompt-pwa-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// インストール時にコアファイルをキャッシュ
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// オフライン運用を可能にするキャッシュファースト処理
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
