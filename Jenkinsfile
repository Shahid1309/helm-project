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
                    sh '''
cat > kubeconfig <<EOF
${KCFG}
EOF

export KUBECONFIG=$PWD/kubeconfig

kubectl get nodes

helm upgrade --install two-tier-app ./myapp \
  --set backend.image=codewithshahid/backend:latest \
  --set frontend.image=codewithshahid/frontend:latest
                    '''
                }
            }
        }
    }
}
