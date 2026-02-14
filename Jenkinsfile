pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/Codingnaveen46/devops-monitoring-demo.git'
            }
        }

        stage('SonarQube Scan') {
            steps {
                sh 'sonar-scanner'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-app .'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image devops-app'
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker tag devops-app opsnaveen/devops-app:v1'
                sh 'docker push opsnaveen/devops-app:v1'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run -d -p 3000:3000 opsnaveen/devops-app:v1'
            }
        }
    }
}
