#!groovy

def IMAGE_REF = ''

pipeline {
  agent any
  stages {

    stage('Checkout') {
      steps {
        checkout scm
        script {
          IMAGE_REF=docker2.imageRef()
        }
      }
    }

    stage('Test') {
      steps {
        sh "docker build . --target tester --tag test-${IMAGE_REF}"
        sh "docker run test-${IMAGE_REF}"
      }
    }

    stage('Build and publish package') {
      steps {
        // Build
        sh "docker build . --target publisher --tag ${IMAGE_REF}"
        // Publish
        script {
          if (env.BRANCH_NAME == 'master') {
            sh "docker run ${IMAGE_REF}"
          }
        }
      }
    }

  }
}
