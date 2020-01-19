module.exports = (req, res) => {
  res.success = (data) => {
    res.status(200).send(data);
  };
};
