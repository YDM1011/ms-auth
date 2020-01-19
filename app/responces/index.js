module.exports = (req, res, next) => {

  require("./success")(req, res);
  require("./notFound")(req, res);
  require("./serverError")(req, res);
  require("./forbidden")(req, res);
  require("./badRequest")(req, res);
  require("./unauthorized")(req, res);
  next();

};
