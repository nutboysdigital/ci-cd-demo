pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        echo '📥 Cloning source code...'
        checkout scm
      }
    }

    stage('Fix Permissions') {
      steps {
        echo '🛠 Menyesuaikan permission folder workspace...'
        sh 'sudo chown -R jenkins:jenkins .'
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

    stage('Install Dependencies') {
      steps {
        sh 'npm install --unsafe-perm=true'
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
