// ===================== LOGIN & SIGNUP =====================

// Fungsi untuk memvalidasi login
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.querySelector('#login-form input[type="text"]').value;
  const password = document.querySelector('#login-form input[type="password"]').value;

  // Validasi login dengan data yang disimpan (contoh menggunakan localStorage)
  if (username === 'user' && password === 'password') {
    localStorage.setItem('userLoggedIn', true); // Menyimpan status login
    window.location.href = 'index.html'; // Arahkan ke halaman dashboard setelah login berhasil
  } else {
    document.getElementById('login-error').style.display = 'block'; // Tampilkan error jika login gagal
  }
});

// Fungsi untuk memvalidasi pendaftaran (signup)
document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.querySelector('#signup-form input[type="text"]').value;
  const email = document.querySelector('#signup-form input[type="email"]').value;
  const username = document.querySelector('#signup-form input[type="text"]').value;
  const password = document.querySelector('#signup-form input[type="password"]').value;
  const confirmPassword = document.querySelector('#signup-form input[type="password"]:nth-child(5)').value;

  if (password !== confirmPassword) {
    document.getElementById('signup-error').style.display = 'block'; // Tampilkan error jika password tidak cocok
  } else {
    // Simpan data pendaftaran (misalnya ke localStorage atau API)
    alert('Akun berhasil dibuat!');
    window.location.href = 'login.html'; // Arahkan ke halaman login setelah pendaftaran
  }
});

// ===================== PAGE NAVIGATION =====================

// Fungsi untuk menangani navigasi antar halaman dalam dashboard
const navLinks = document.querySelectorAll('nav a');
const mainContent = document.getElementById('main-content');

const pages = {
  dashboard: `
    <section class="card" tabindex="0">
      <div class="card-header">
        <span class="material-icons card-icon">water_drop</span>
        <h2>Kelembaban Tanah</h2>
      </div>
      <div class="status-value" id="moisture-status">68%</div>
    </section>
    <section class="card" tabindex="0">
      <div class="card-header">
        <span class="material-icons card-icon">power</span>
        <h2>Status Pompa</h2>
      </div>
      <div class="status-value" id="pump-status">Menyala</div>
      <button class="btn-control" id="pump-control">Matikan Pompa</button>
    </section>
  `,
  settings: `
    <section class="card">
      <h2>Pengaturan Sistem</h2>
      <form id="settings-form">
        <label for="moisture-threshold">Ambang Kelembaban (%)</label>
        <input type="number" id="moisture-threshold" min="0" max="100" value="60" required />
        <button type="submit">Simpan Pengaturan</button>
      </form>
    </section>
  `,
};

function loadPage(page) {
  if (!(page in pages)) page = 'dashboard';
  mainContent.innerHTML = pages[page];

  if (page === 'dashboard') {
    const pumpControlBtn = document.getElementById('pump-control');
    const pumpStatus = document.getElementById('pump-status');

    pumpControlBtn.addEventListener('click', () => {
      if (pumpStatus.textContent.toLowerCase().includes('menyala')) {
        pumpStatus.textContent = 'Mati';
        pumpControlBtn.textContent = 'Nyalakan Pompa';
        pumpControlBtn.style.backgroundColor = '#dc2626';
      } else {
        pumpStatus.textContent = 'Menyala';
        pumpControlBtn.textContent = 'Matikan Pompa';
        pumpControlBtn.style.backgroundColor = '#2563eb';
      }
    });
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = e.target.getAttribute('data-page');
    loadPage(page);

    navLinks.forEach(l => l.classList.remove('active'));
    e.target.classList.add('active');
  });
});

// Memuat halaman dashboard secara default
loadPage('dashboard');

// ===================== GRAPH =====================

// Fungsi untuk merender grafik kelembaban tanah
function renderGraph() {
  const ctx = document.getElementById('moistureGraph').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['10 Apr', '11 Apr', '12 Apr', '13 Apr', '14 Apr', '15 Apr'],
      datasets: [
        {
          label: 'Kelembaban Tanah (%)',
          data: [65, 62, 70, 74, 69, 55],
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.3)',
          fill: true,
        },
      ],
    },
  });
}

// Memanggil fungsi renderGraph saat memasuki halaman grafik
document.getElementById('graph').addEventListener('click', renderGraph);

// ===================== SETTINGS =====================

// Menyimpan pengaturan sistem yang diubah
document.getElementById('settings-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const moistureThreshold = document.getElementById('moisture-threshold').value;
  localStorage.setItem('moistureThreshold', moistureThreshold);
  alert('Pengaturan berhasil disimpan!');
});

// ===================== NOTIFICATIONS =====================

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Contoh: Menampilkan notifikasi tentang air hampir habis
showNotification('Peringatan: Air hampir habis!');

// ===================== LOGOUT =====================

// Fungsi logout
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('userLoggedIn');
  window.location.href = 'dashboard.html';
});
