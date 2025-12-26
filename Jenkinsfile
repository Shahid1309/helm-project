pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'codewithshahid'
        FRONTEND_IMAGE = "$DOCKERHUB_USER/frontend:v2"
        BACKEND_IMAGE  = "$DOCKERHUB_USER/backend:v2"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh """
                  docker build -t ${FRONTEND_IMAGE} ./client
                  docker build -t ${BACKEND_IMAGE} ./server
                """
            }
        }

        stage('Login & Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'two-tier-app-cicd-token',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh """
                      echo $PASS | docker login -u $USER --password-stdin
                      docker push ${FRONTEND_IMAGE}
                      docker push ${BACKEND_IMAGE}
                    """
                }
            }
        }

        stage('Deploy using Helm') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                    sh """
                      export KUBECONFIG=$KUBECONFIG_FILE
                      helm upgrade --install two-tier-app ./jamia-app \
                        --set frontend.image=${FRONTEND_IMAGE} \
                        --set backend.image=${BACKEND_IMAGE}
                    """
                }
            }
        }
    }
}
