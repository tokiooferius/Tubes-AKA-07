from flask import Flask, render_template
import matplotlib.pyplot as plt
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    # Data yang dihasilkan dari analisis algoritma (contoh)
    methods = ['Iteratif', 'Rekursif']
    execution_times = [15, 25]  # Waktu eksekusi dalam ms (misalnya)

    # Membuat grafik batang (bar chart)
    plt.figure(figsize=(8, 6))
    bars = plt.bar(methods, execution_times, color=['#3498db', '#e74c3c'])

    # Menambahkan label pada grafik
    plt.title('Analisis Efisiensi Algoritma')
    plt.xlabel('Metode')
    plt.ylabel('Waktu Eksekusi (ms)')

    # Menambahkan label angka pada masing-masing bar
    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width() / 2, yval, round(yval, 2), ha='center', va='bottom')

    # Menyimpan grafik sebagai gambar PNG di folder static
    plt.tight_layout()
    plt.savefig('static/graph.png')  # Gambar disimpan di folder 'static'
    plt.close()

    # Render template HTML yang menampilkan grafik
    return render_template('graphic.html')

if __name__ == '__main__':
    app.run(debug=True)
