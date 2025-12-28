let chartInstance;

// Inisialisasi Grafik saat halaman dimuat (jika ada canvas)
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('executionChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Iteratif (Linear Search)',
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    data: [],
                    fill: true,
                    tension: 0.3
                }, {
                    label: 'Rekursif (Binary Search)',
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    data: [],
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Waktu (ms)' } },
                    x: { title: { display: true, text: 'Percobaan Ke-' } }
                }
            }
        });
    }
});

// Listener untuk Tombol Generate
if(document.getElementById('generateData')) {
    document.getElementById('generateData').addEventListener('click', function() {
        const n = document.getElementById('nValue').value;
        if (!n || n <= 0) return alert('Masukkan jumlah n!');
        const data = Array.from({ length: parseInt(n) }, () => Math.floor(Math.random() * 1000));
        document.getElementById('generatedNumbers').innerText = data.slice(0, 30).join(', ') + (data.length > 30 ? '...' : '');
        runAnalysis(data);
    });
}

// Listener untuk Tombol Manual
if(document.getElementById('useManualInput')) {
    document.getElementById('useManualInput').addEventListener('click', function() {
        const input = document.getElementById('manualArray').value;
        if (!input) return alert('Masukkan angka manual!');
        const data = input.split(',').map(num => parseInt(num.trim())).filter(n => !isNaN(n));
        document.getElementById('generatedNumbers').innerText = data.join(', ');
        runAnalysis(data);
    });
}

function runAnalysis(data) {
    const target = data[Math.floor(data.length / 2)]; // Target di tengah agar adil

    // Hitung Linear (Iteratif)
    const t0 = performance.now();
    linearSearch(data, target);
    const t1 = performance.now();
    const timeIter = t1 - t0;

    // Hitung Binary (Rekursif) - Harus Sort
    const sortedData = [...data].sort((a, b) => a - b);
    const t2 = performance.now();
    binarySearch(sortedData, target);
    const t3 = performance.now();
    const timeRek = t3 - t2;

    updateUI(data.length, timeIter, timeRek);
}

function updateUI(n, tIter, tRek) {
    // 1. Update Tabel jika ada
    const tbody = document.querySelector('#resultTable tbody');
    if (tbody) {
        const row = `<tr>
            <td>${tbody.rows.length + 1}</td>
            <td>${n}</td>
            <td>${tIter.toFixed(5)}</td>
            <td>${tRek.toFixed(5)}</td>
        </tr>`;
        tbody.innerHTML += row;
    }

    // 2. Update Grafik jika ada
    if (chartInstance) {
        chartInstance.data.labels.push(chartInstance.data.labels.length + 1);
        chartInstance.data.datasets[0].data.push(tIter);
        chartInstance.data.datasets[1].data.push(tRek);
        chartInstance.update();
    }
}

function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) if (arr[i] === target) return i;
    return -1;
}

function binarySearch(arr, target) {
    const search = (low, high) => {
        if (low > high) return -1;
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) return mid;
        return arr[mid] > target ? search(low, mid - 1) : search(mid + 1, high);
    };
    return search(0, arr.length - 1);
}
