const env = process.env.NODE_ENV || 'development';
const _ = require("underscore");

const config = {
    development: require("./env/development"),
    production: require("./env/production"),
};

const envConfig = config[env] ? config[env] : config.development;

module.exports = _.extend({
    instanceCreatedAt: "msAuth",
    NODE_ENV: env,
    IS_PRODUCTION: env === "production",
    VERSION: process.env.VERSION || "1.0.0"
}, envConfig);
