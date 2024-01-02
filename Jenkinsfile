#!groovy

pipeline {
    agent any
    triggers {
        cron('0 0 * * 0')
    }
    stages {
        stage('Check') {
            steps {
                nodejs(nodeJSInstallationName: 'default') {
                    sh 'npm --version'
                }
            }
        }
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'default') {
                    sh 'npm install && npm run build'
                }
            }
        }
        stage('Update') {
          steps {
            echo 'Do nothing'
          }
        }
    }
}
