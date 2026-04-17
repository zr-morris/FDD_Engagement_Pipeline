module.exports = {
  apps: [
    {
      name: 'fdd-app',
      script: 'node',
      args: 'server.js',
      cwd: '/workspace/kpmg-fdd-pipeline',
      env: { NODE_ENV: 'production', PORT: '5173' },
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 2000,
    },
    {
      name: 'fdd-api',
      script: 'node',
      args: 'server.js',
      cwd: '/workspace/kpmg-fdd-pipeline',
      env: { NODE_ENV: 'production', PORT: '3000' },
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 2000,
    },
  ],
};
