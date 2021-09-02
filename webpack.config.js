const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { NODE_ENV } = process.env;

let localEnv = {
  WBPACK_DEV_SERVER_HOST: '0.0.0.0',
};

try {
  const localEnvPath = path.resolve(__dirname, './enviroment/.env.local');
  localEnvBuffer = fs.readFileSync(localEnvPath);
  localEnv = {
    ...localEnv,
    ...dotenv.parse(localEnvBuffer)
  }
}catch(e){
  console.log('⚡️ 解析本地配置文件失败，将使用默认配置···')
}finally{
  // The process.env object forces all of its properties to be of type string, since environment variables must always be strings. 
  for (let attr in localEnv) {
    process.env[attr] = localEnv[attr]
  }
}

dotenv.config({
  path: path.resolve(__dirname, `enviroment/.env.${NODE_ENV}`)
})

module.exports = require(`./bundle/webpack.config.${NODE_ENV}.js`);