const CACHE_NAME = 'ziad-store-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// تثبيت الـ Service Worker وحفظ الملفات الأساسية في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('DotFlow Engine: Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// تفعيل المحرك والتحكم في الصفحات
self.addEventListener('activate', (event) => {
  console.log('DotFlow Engine: Service Worker Activated');
});

// جلب الملفات (يجعل التطبيق يفتح بسرعة)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});