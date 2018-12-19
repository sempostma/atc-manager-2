self.addEventListener('push', ev => {
  const data = ev.data.json();
  data.badge = 'https://esstudio.site/atc-manager-2/assets/images/meta-icons/mstile-144x144.png';
  data.icon = 'https://esstudio.site/atc-manager-2/assets/images/image_src.png';
  ev.waitUntil(
    self.registration.showNotification(data.title, data)
  );
});


self.addEventListener('notificationclick', function (event) {
  if (event.notification.data && event.notification.data.url) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});