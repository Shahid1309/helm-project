pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    DOCKER_USER = "${DOCKERHUB_CREDENTIALS_USR}"
    DOCKER_PASS = "${DOCKERHUB_CREDENTIALS_PSW}"

    IMAGE_BACKEND = "codewithshahid/backend"
    IMAGE_FRONTEND = "codewithshahid/frontend"
  }

  stages {

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend Image') {
      steps {
        sh """
          echo '🔐 Logging into Docker Hub'
          docker login -u $DOCKER_USER -p $DOCKER_PASS

          echo '🐳 Building Backend Image'
          docker build -t $IMAGE_BACKEND:latest ./server

          echo '📤 Pushing Backend Image'
          docker push $IMAGE_BACKEND:latest
        """
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh """
          echo '🔐 Logging into Docker Hub'
          docker login -u $DOCKER_USER -p $DOCKER_PASS

          echo '🐳 Building Frontend Image'
          docker build -t $IMAGE_FRONTEND:latest ./client

          echo '📤 Pushing Frontend Image'
          docker push $IMAGE_FRONTEND:latest
        """
      }
    }

    stage('Deploy to Kubernetes using Helm') {
      steps {
        // IMPORTANT: kubeconfig stored as Secret File with ID = kubeconfig-file
        withCredentials([file(credentialsId: 'kubeconfig-file', variable: 'KCFG')]) {
          sh """
            export KUBECONFIG=$KCFG

            echo '🔍 Checking cluster access...'
            kubectl get nodes

            echo '🚀 Deploying with Helm...'
            helm upgrade --install myapp ./myapp \
              --set backend.image=$IMAGE_BACKEND:latest \
              --set frontend.image=$IMAGE_FRONTEND:latest
          """
        }
      }
    }
  }
}
