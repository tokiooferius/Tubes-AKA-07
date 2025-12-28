// Fungsi untuk menampilkan grafik analisis
function showChart(iterativeTime, recursiveTime) {
  const ctx = document.getElementById('efficiencyChart').getContext('2d');
  
  // Membuat grafik dengan data waktu eksekusi dari algoritma iteratif dan rekursif
  const efficiencyChart = new Chart(ctx, {
    type: 'bar', // Tipe grafik: bar chart
    data: {
      labels: ['Iteratif', 'Rekursif'], // Label untuk setiap metode
      datasets: [{
        label: 'Waktu Eksekusi (ms)',
        data: [iterativeTime, recursiveTime], // Data waktu eksekusi
        backgroundColor: ['#3498db', '#e74c3c'], // Warna bar untuk masing-masing metode
        borderColor: ['#2980b9', '#c0392b'], // Warna border
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true // Memulai sumbu Y dari 0
        }
      }
    }
  });
}

// Fungsi untuk menjalankan analisis dan menampilkan waktu eksekusi
function analisis() {
  const dataInput = document.getElementById('data').value.split(',').map(num => parseInt(num.trim()));
  const target = parseInt(document.getElementById('target').value);

  // Fungsi Iteratif
  const iterativeStart = performance.now();
  const iterativeResult = searchIterative(dataInput, target);
  const iterativeEnd = performance.now();
  const iterativeTime = (iterativeEnd - iterativeStart).toFixed(4);

  // Fungsi Rekursif
  const recursiveStart = performance.now();
  const recursiveResult = searchRecursive(dataInput, target, 0);
  const recursiveEnd = performance.now();
  const recursiveTime = (recursiveEnd - recursiveStart).toFixed(4);

  // Menampilkan hasil waktu eksekusi di tabel atau elemen lain
  document.getElementById('iterative-time').textContent = `${iterativeTime} ms`;
  document.getElementById('recursive-time').textContent = `${recursiveTime} ms`;

  // Menampilkan grafik
  showChart(iterativeTime, recursiveTime);
}

// Fungsi pencarian menggunakan metode Iteratif
function searchIterative(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return true; // Ditemukan
    }
  }
  return false; // Tidak Ditemukan
}

// Fungsi pencarian menggunakan metode Rekursif
function searchRecursive(arr, target, index) {
  if (index === arr.length) {
    return false; // Tidak Ditemukan
  }
  if (arr[index] === target) {
    return true; // Ditemukan
  }
  return searchRecursive(arr, target, index + 1); // Rekursif ke elemen berikutnya
}
