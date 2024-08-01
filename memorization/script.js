
document.getElementById('planForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const totalPages = 604; // عدد صفحات القرآن الكريم
  const totalLines = 15 * totalPages; // افتراض أن كل صفحة تحتوي على 15 سطرًا
  const duration = parseInt(document.getElementById('duration').value);
  const daysPerWeek = parseInt(document.getElementById('daysPerWeek').value);
  const unit = document.getElementById('unit').value;

  // حساب عدد الأيام الفعلية للحفظ
  const totalDays = duration * (daysPerWeek / 7);

  let dailyAmount;
  if (unit === 'pages') {
      // حساب عدد الصفحات اليومية
      dailyAmount = totalPages / totalDays;
      document.getElementById('dailyAmount').innerText = `أنت بحاجة لحفظ ${dailyAmount.toFixed(2)} صفحة في اليوم.`;
  } else if (unit === 'lines') {
      // حساب عدد السطور اليومية
      dailyAmount = totalLines / totalDays;
      document.getElementById('dailyAmount').innerText = `أنت بحاجة لحفظ ${dailyAmount.toFixed(2)} سطر في اليوم.`;
  }

  // حفظ البيانات في LocalStorage
  localStorage.setItem('duration', duration);
  localStorage.setItem('daysPerWeek', daysPerWeek);
  localStorage.setItem('unit', unit);
  localStorage.setItem('dailyAmount', dailyAmount.toFixed(2));

  document.getElementById('result').classList.remove('hidden');
  document.getElementById('notifyBtn').classList.remove('hidden');
});

// استعادة البيانات من LocalStorage عند تحميل الصفحة
window.addEventListener('load', function() {
  if (localStorage.getItem('duration') && localStorage.getItem('daysPerWeek') && localStorage.getItem('unit') && localStorage.getItem('dailyAmount')) {
      document.getElementById('duration').value = localStorage.getItem('duration');
      document.getElementById('daysPerWeek').value = localStorage.getItem('daysPerWeek');
      document.getElementById('unit').value = localStorage.getItem('unit');
      document.getElementById('dailyAmount').innerText = `أنت بحاجة لحفظ ${localStorage.getItem('dailyAmount')} ${localStorage.getItem('unit') === 'pages' ? 'صفحة' : 'سطر'} في اليوم.`;
      document.getElementById('result').classList.remove('hidden');
      document.getElementById('notifyBtn').classList.remove('hidden');
  }
});

// إعداد التذكيرات باستخدام Service Worker و Push API
document.getElementById('notifyform').addEventListener('submit', function(event) {
  event.preventDefault();
let timenotifyvalue = timenotify.value



  Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
          navigator.serviceWorker.ready.then(function(registration) {
              // ضبط تذكير كل 30 ثانية
              setInterval(() => {
                  registration.showNotification("تذكير الحفظ اليومي", {
                      body: `أنت بحاجة لحفظ ${localStorage.getItem('dailyAmount')} ${localStorage.getItem('unit') === 'pages' ? 'صفحة' : 'سطر'} اليوم.`,
                      icon: 'https://example.com/icon.png' // يمكنك تغيير رابط الأيقونة
                  });
              }, timenotifyvalue); // 30 ثانية بالميلي ثانية

              // تذكير فوري بعد تفعيل التذكيرات
              registration.showNotification("تذكير الحفظ اليومي", {
                  body: `أنت بحاجة لحفظ ${localStorage.getItem('dailyAmount')} ${localStorage.getItem('unit') === 'pages' ? 'صفحة' : 'سطر'} اليوم.`,
                  icon: 'https://example.com/icon.png' // يمكنك تغيير رابط الأيقونة
              });
          });
      }
  });
});
