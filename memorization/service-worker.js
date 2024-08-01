
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "تذكير الحفظ اليومي";
  const options = {
      body: data.body || "تذكير الحفظ اليومي",
      icon: 'https://example.com/icon.png' // يمكنك تغيير رابط الأيقونة
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
      clients.openWindow('https://example.com') // يمكنك تغيير الرابط
  );
});
