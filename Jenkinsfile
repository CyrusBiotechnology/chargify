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

    stage('Build') {
      steps {
        sh "docker build . --target builder"
      }
    }

    stage('Publish package to npm') {
      steps {
        script {
          if (env.BRANCH_NAME == 'master') {
            withCredentials([string(credentialsId: 'npm-auth-token', variable: 'npm_token')]) {
              sh "docker build . --target publisher --tag ${IMAGE_REF} --build-arg npm_token=${npm_token}"
              sh "docker run ${IMAGE_REF}"
            }
          }
        }
      }
    }

  }
}
