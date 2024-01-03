#!groovy

pipeline {
    agent none
    triggers {
        cron('0 0 * * 0')
    }
    stages {
        stage('Check') {
            agent {
                docker { image 'node:20.10.0-alpine3.19' }
            }
            steps {
                sh 'node --version'
            }
        }
        stage('Build') {
            agent {
                docker { image 'node:20.10.0-alpine3.19' }
            }
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
