pipeline {
    agent any

    environment {
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

        stage('Clean Previous Containers') {
            steps {
                echo "Cleaning up old containers..."
                sh "${DOCKER_COMPOSE} down --remove-orphans -v || true"
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images..."
                sh "DOCKER_BUILDKIT=0 ${DOCKER_COMPOSE} build --no-cache"
            }
        }

        stage('Run Application') {
            steps {
                echo "Starting containers..."
                sh "${DOCKER_COMPOSE} up -d || true"
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Showing running containers..."
                sh "docker ps"
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}

