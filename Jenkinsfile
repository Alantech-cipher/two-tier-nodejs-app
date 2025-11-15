pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = "docker-compose"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling latest code from GitHub..."
                checkout scm
            }
        }

        stage('Install Node Modules') {
            steps {
                echo "Installing npm packages..."
                sh 'npm install'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images..."
                sh "${DOCKER_COMPOSE} build"
            }
        }

        stage('Run Application') {
            steps {
                echo "Starting containers..."
                sh "${DOCKER_COMPOSE} up -d --remove-orphans"
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Showing running containers..."
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo "🎉 Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}

