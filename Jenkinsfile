pipeline {
  agent any

  environment {
    APP_DIR = '/home/jenkins/myapp'
  }

  stages {
    stage('Deploy to Local VPS') {
      steps {
        sh '''
          echo "🚀 Mulai proses deploy ke VPS lokal..."

          mkdir -p $APP_DIR
          cp -r * $APP_DIR

          cd $APP_DIR
          npm install

          if pm2 list | grep -q "app"; then
            pm2 restart app
          else
            pm2 start app.js --name app
          fi

          pm2 save
        '''
      }
    }
  }
}
