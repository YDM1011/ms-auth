module.exports = {
    app: {
        name: 'msAuth',
        domain: "localhost"
    },
    port: process.env.PORT || 3000,
    db: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'msAuth'
    },
    jwtSecret: process.env.JWTSECRET || "secret",
    email: {
        host: "smtp.mail.yahoo.com",
        port: 465,
        secure: true,
        user: "ydm101194@yahoo.com",
        message: "Hello from testApp",
        subject: "testApp",
        pass: "adn45hrf"
    }
};
