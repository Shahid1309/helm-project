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
          docker login -u $DOCKER_USER -p $DOCKER_PASS
          docker build -t $IMAGE_BACKEND:latest ./server
          docker push $IMAGE_BACKEND:latest
        """
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh """
          docker login -u $DOCKER_USER -p $DOCKER_PASS
          docker build -t $IMAGE_FRONTEND:latest ./client
          docker push $IMAGE_FRONTEND:latest
        """
      }
    }

    stage('Deploy to Kubernetes using Helm') {
      steps {
        withCredentials([string(credentialsId: 'kubeconfig', variable: 'KCFG')]) {
          sh """
# Write kubeconfig (VERY important to use double quotes here)
cat > kubeconfig <<'EOF'
${KCFG}
EOF

export KUBECONFIG=\$PWD/kubeconfig

echo '🔍 Checking cluster access...'
kubectl get nodes

echo '🚀 Deploying using Helm...'
helm upgrade --install myapp . \
  --set backend.image=$IMAGE_BACKEND:latest \
  --set frontend.image=$IMAGE_FRONTEND:latest
          """
        }
      }
    }
  }
}
