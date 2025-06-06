pipeline {
  agent any
  environment {
    APP_DIR = "/home/jenkins/myapp"
  }
  stages {

    stage('Checkout') {
      steps {
        echo '📥 Cloning source code...'
        checkout scm
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withCredentials([string(credentialsId: 'SONARQUBE_TOKEN', variable: 'SONARQUBE_TOKEN')]) {
          withSonarQubeEnv('SonarQube') {
            sh 'npm install'
            sh '''
              npx sonar-scanner \
                -Dsonar.projectKey=myapp \
                -Dsonar.sources=. \
                -Dsonar.exclusions=myapp-chart/**/* \
                -Dsonar.host.url=http://localhost:9000 \
                -Dsonar.login=$SONARQUBE_TOKEN
            '''
          }
        }
      }
    }


    stage('Install ESLint v8') {
      steps {
        echo '📦 Install ESLint versi 8...'
        sh '''
          npm uninstall eslint || true
          npm install eslint@8 --save-dev
        '''
      }
    }

    stage('Lint & Static Analysis') {
      steps {
        echo '🔍 Menjalankan ESLint....'
        sh 'npx eslint . || exit 1'
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Install dependencies...'
        sh '''
          rm -rf node_modules  # Hindari permission error sisa install sebelumnya
          npm install --unsafe-perm=true
        '''
      }
    }

    stage('Deploy to Local VPS') {
      steps {
        echo '🚀 Deploy ke VPS lokal...'
        sh '''
          mkdir -p $APP_DIR

          # Copy project ke direktori tujuan
          cp -r Jenkinsfile app.js package*.json public $APP_DIR

          # Pindah ke folder dan pastikan permission aman
          cd $APP_DIR
          rm -rf node_modules
          npm install --unsafe-perm=true

          # Jalankan ulang aplikasi
          pm2 delete app || true
          pm2 start app.js --name app
          pm2 save
        '''
      }
    }
  }
}