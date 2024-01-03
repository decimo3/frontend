#!groovy

pipeline {
    docker {
        image 'node:20.7.0-alpine3.19'
        args '-p 3000:3000'
    }
    triggers {
        cron('0 0 * * 0')
    }
    stages {
        stage('Check') {
            steps {
                sh 'npm --version'
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
