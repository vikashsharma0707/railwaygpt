pipeline {
  agent any
  environment {
    REGISTRY = "ghcr.io/your-org/railwaygpt"
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install Server') {
      steps { dir('server') { sh 'npm ci' } }
    }
    stage('Test Server') {
      steps { dir('server') { sh 'npm test -- --ci' } }
    }
    stage('Install Client') {
      steps { dir('client') { sh 'npm ci' } }
    }
    stage('Build Client') {
      steps { dir('client') { sh 'npm run build' } }
    }
    stage('Docker Build') {
      steps {
        sh 'docker build -t $REGISTRY/server:$BUILD_NUMBER ./server'
        sh 'docker build -t $REGISTRY/client:$BUILD_NUMBER ./client'
      }
    }
    stage('Docker Push') {
      when { branch 'main' }
      steps {
        withCredentials([usernamePassword(credentialsId: 'registry', usernameVariable: 'U', passwordVariable: 'P')]) {
          sh 'echo $P | docker login ghcr.io -u $U --password-stdin'
          sh 'docker push $REGISTRY/server:$BUILD_NUMBER'
          sh 'docker push $REGISTRY/client:$BUILD_NUMBER'
        }
      }
    }
    stage('Deploy K8s') {
      when { branch 'main' }
      steps {
        sh 'kubectl set image deploy/railwaygpt-server server=$REGISTRY/server:$BUILD_NUMBER'
        sh 'kubectl set image deploy/railwaygpt-client client=$REGISTRY/client:$BUILD_NUMBER'
      }
    }
  }
  post {
    failure { echo 'Build failed' }
    success { echo 'Deployed' }
  }
}
