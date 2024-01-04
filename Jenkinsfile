#!groovy

pipeline {
    agent {
        docker {
            image 'node:20.10.0-alpine3.19'
        }
    }
    triggers {
        cron('0 0 * * 0')
    }
    stages {
        stage('Check') {
            steps {
                sh 'node --version'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install && npm run build'
            }
        }
        stage('Update') {
            steps {
                echo 'Do nothing'
            }
        }
    }
}
