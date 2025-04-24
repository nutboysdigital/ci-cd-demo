pipeline {
  agent any

  environment {
    APP_DIR = '/home/jenkins/myapp'
  }

  stages {
    stage('Checkout') {
      steps {
        echo '✅ Source code otomatis di-clone oleh Jenkins dari GitHub.'
      }
    }

    stage('Deploy to Local VPS') {
      steps {
        sh '''
          echo "🚀 Mulai proses deploy ke VPS lokal..."

          # Buat folder aplikasi (jika belum ada)
          mkdir -p $APP_DIR

          # Copy semua file ke direktori aplikasi
          cp -r * $APP_DIR

          # Pindah ke direktori aplikasi
          cd $APP_DIR

          # Install dependency Node.js
          npm install

          # Jalankan atau restart aplikasi pakai PM2
          if pm2 list | grep -q "app"; then
            echo "🔁 Restart aplikasi..."
            pm2 restart app
          else
            echo "▶️ Menjalankan aplikasi pertama kali..."
            pm2 start app.js --name app
          fi

          # Simpan konfigurasi PM2 agar survive reboot
          pm2 save
        '''
      }
    }
  }
}
