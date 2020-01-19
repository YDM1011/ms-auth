const logger = require('morgan');
const createError = require('http-errors');
const { usersRouter, userModel } = require('../components/users');
const { createDb, createTables} = require('../servises/db');

module.exports = async (app, config) => {
    app.use(logger('dev'));
    app.use(require("../../app/responces"));

    app.use('/users', usersRouter);
    app.use((req, res, next) => {
        next(createError(404));
    });

    await createDb(config.db).catch(e=>console.error(e));
    await userModel(config.db).catch(e=>console.error(e));


    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send(err);
    });

    return app
};