 const display = document.getElementById('display');
    const clicksound = document.getElementById('clicksound');

    function playSound() {
      clicksound.currentTime = 0;
      clicksound.play();
    }

    function append(value) {
      playSound();

      if (value === '=') return;
      if (display.textContent === '0' || display.textContent === 'error') {
        display.textContent = '';
      }

      // Batasi input agar tidak terlalu panjang
      if (display.textContent.length >= 20) return;

      display.textContent += value;
    }

    function clearDisplay() {
      playSound();
      display.textContent = '0';
    }

    function deleteLast() {
      playSound();
      const current = display.textContent;
      if (current.length > 1 && current !== 'error') {
        display.textContent = current.slice(0, -1);
      } else {
        display.textContent = '0';
      }
    }

    function calculate() {
      playSound();
      try {
        const result = eval(display.textContent);
        display.textContent = result.toString();
      } catch {
        display.textContent = 'error';
      }
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      const key = e.key;

      if ((/\d|[+\-*/%.]/).test(key)) {
        append(key);
      } else if (key === 'Enter') {
        calculate();
      } else if (key === 'Backspace') {
        deleteLast();
      } else if (key.toLowerCase() === 'c') {
        clearDisplay();
      }
    });

    // service-worker.js
self.addEventListener('install', e => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', e => {
  // Bisa tambahkan cache di sini
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registered!'));
}