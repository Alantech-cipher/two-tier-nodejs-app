pipeline {
    agent any

    environment {
        // Use Docker Compose v2 syntax (CLI plugin)
        DOCKER_COMPOSE = "docker compose"
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
                sh "${DOCKER_COMPOSE} build --no-cache"
            }
        }

        stage('Run Application') {
            steps {
                echo "Stopping old containers (if any)..."
                sh "${DOCKER_COMPOSE} down --remove-orphans -v || true"

                echo "Starting containers..."
                sh "${DOCKER_COMPOSE} up -d"
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Listing running containers..."
                sh "docker ps"
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed! Cleaning up..."
            sh "${DOCKER_COMPOSE} down --remove-orphans -v || true"
        }
    }
}

