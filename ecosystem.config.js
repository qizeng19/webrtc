module.exports = {
  apps: [
    {
    "name": "node-app",
    "script": "app.js",
    "instances":"max",
    "exec_mode":"cluster",
    }
  ]
};
