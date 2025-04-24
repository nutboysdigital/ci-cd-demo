pipeline {
  agent any

  environment {
    REMOTE_USER = 'root'
    REMOTE_HOST = '103.74.5.88'
    APP_DIR = '/root/myapp'
  }

  stages {
    stage('Clone Repo') {
      steps {
        echo 'Repo cloned automatically by Jenkins from GitHub'
      }
    }

    stage('Deploy to VPS') {
      steps {
        sh '''
        echo "Deploying app to VPS..."
        ssh -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST "mkdir -p $APP_DIR"
        scp -r * $REMOTE_USER@$REMOTE_HOST:$APP_DIR
        ssh $REMOTE_USER@$REMOTE_HOST "cd $APP_DIR && npm install && pm2 restart app || pm2 start app.js"
        '''
      }
    }
  }
}