import time
import json

# Faktorial Rekursif
def faktorial_rekursif(n):
    if n == 0 or n == 1:
        return 1
    return n * faktorial_rekursif(n - 1)

# Faktorial Iteratif
def faktorial_iteratif(n):
    hasil = 1
    for i in range(1, n + 1):
        hasil *= i
    return hasil

# Nilai input
n_values = [5, 10, 20, 100, 200, 300, 500]
recursive_times = []
iterative_times = []

# Pengukuran waktu
for n in n_values:
    start = time.time()
    faktorial_rekursif(n)
    recursive_times.append(time.time() - start)

    start = time.time()
    faktorial_iteratif(n)
    iterative_times.append(time.time() - start)

# Simpan ke JSON
data = {
    "n": n_values,
    "recursive": recursive_times,
    "iterative": iterative_times
}

with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

print("✅ Data berhasil disimpan ke data.json")
