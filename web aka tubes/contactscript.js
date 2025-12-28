// Menunggu sampai halaman sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm'); // Ambil form
  const button = form.querySelector('button'); // Ambil tombol kirim

  // Ketika tombol kirim diklik
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah form dikirim secara default

    const name = document.getElementById('name').value; // Ambil nilai nama
    const email = document.getElementById('email').value; // Ambil nilai email
    const message = document.getElementById('message').value; // Ambil nilai pesan

    // Validasi input (contoh sederhana)
    if (!name || !email || !message) {
      alert("Semua kolom harus diisi!");
      return;
    }

    // Menampilkan konfirmasi sebelum mengirim pesan
    if (confirm(`Apakah Anda yakin ingin mengirim pesan?\n\nNama: ${name}\nEmail: ${email}\nPesan: ${message}`)) {
      // Simulasikan pengiriman data (Anda dapat menambahkan logika untuk pengiriman email atau penyimpanan data)
      alert('Pesan Anda telah dikirim. Terima kasih!');
      
      // Reset form setelah berhasil mengirim
      form.reset();
    }
  });
});
