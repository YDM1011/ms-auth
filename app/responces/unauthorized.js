
module.exports = (req, res) => {
  res.unauthorized = (data = '') => {
      res.status(401).send(data);
  };
};
