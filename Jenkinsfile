pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        echo '📥 Cloning source code...'
        checkout scm
      }
    }

    stage('Lint & Static Analysis') {
      steps {
        echo '🔍 Menjalankan ESLint...'
        sh 'npx eslint . || exit 1'
      }
    }

    // stage('Secret Detection') {
    //   steps {
    //     echo '🔒 Memeriksa secret leakage...'
    //     sh '''
    //       export PATH=$PATH:/usr/local/bin
    //       gitleaks detect --source . --no-banner || exit 1
    //     '''
    //   }
    // }

    // stage('Dependency Scan') {
    //   steps {
    //     echo '🧪 Memeriksa vulnerability dependency...'
    //     sh 'trivy fs . || exit 1'
    //   }
    // }

    stage('Install & Build') {
      steps {
        echo '📦 Install dependencies...'
        sh 'npm install'
      }
    }

    stage('Deploy to Local VPS') {
      steps {
        echo '🚀 Deploy ke VPS lokal...'
        sh '''
          mkdir -p /home/jenkins/myapp
          cp -r Jenkinsfile app.js package*.json public /home/jenkins/myapp
          cd /home/jenkins/myapp
          npm install
          pm2 delete app || true
          pm2 start app.js --name app
          pm2 save
        '''
      }
    }
  }
}
