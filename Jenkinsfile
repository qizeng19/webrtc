pipeline {
  agent any
  stages {
    // stage('build') {
    //   steps {
    //     sh 'yarn install'
    //     sh 'yarn build:dev'
    //   }
    // }
    stage('docker') {
      steps {
        sh 'sudo docker rm -f xxx_project_test && sudo docker rmi xxx_project_test'
        sh 'sudo docker build -t xxx_project_test .'
        sh 'sudo docker run --name xxx_project_test -p 5205:8080 --restart=always -d xxx_project_test'
      }
    }
  }
  environment {
    ACB_DOCKER_HOST = '192.168.0.230'
  }
}