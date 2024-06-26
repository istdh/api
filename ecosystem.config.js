module.exports = {
  apps: [
    {
      name: 'api.congvieclam.vn',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      }
    }
  ]
};
