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
        sh "docker build . --target builder"
        // Publish
        script {
          if (env.BRANCH_NAME == 'master') {
            withCredentials([usernamePassword(credentialsId: 'npm-auth-token', usernameVariable: 'npm_email', passwordVariable: 'npm_token')]) {
              sh "docker build . --target publisher --tag ${IMAGE_REF} --build-arg npm_email=${npm_email} --build-arg npm_token=${npm_token}"
              sh "docker run ${IMAGE_REF}"
            }
          }
        }
      }
    }

  }
}
