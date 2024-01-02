#!groovy

pipeline {
    agent any
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
                git 'https://github.com/decimo3/produtivity-webapp'
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
