module.exports = {
  app: {
      name: 'msAuth',
      port: process.env.PORT || 3000
  },
  db: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'msAuth'
  },
  jwt: {
      jwtSecret: process.env.JWTSECRET || "secret",
  }
};
