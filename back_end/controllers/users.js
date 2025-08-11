module.exports.newuser = (req, res) => {
  res.send("create new user");
};

module.exports.userprofile = (req, res) => {
  res.send(`view with user id =  ${req.params.id}`);
};

module.exports.edit = (req, res) => {
  res.send(`edit with user id =  ${req.params.id}`);
};

module.exports.delete = (req, res) => {
  res.send(`delete with user id =  ${req.params.id}`);
};
