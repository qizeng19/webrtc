#/usr/bin
#记得添加版本迭代
version="1.0.0";
imageName="xxx_project_release";
``
echo "--> npm install"
cd ..
sudo yarn install && sudo yarn build

echo "--> copy files shell.prod.sh"
sudo cp -rf Dockerfile ./dist
cd ./dist

echo "--> docker build"
sudo docker build -t web/"$imageName":"$version" .
sudo docker tag web/"$imageName":"$version" docker.local61:5000/web/"$imageName":"$version"
sudo docker push docker.local61:5000/web/"$imageName":"$version"
sudo docker rmi web/"$imageName":"$version"