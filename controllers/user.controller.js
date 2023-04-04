const user = require("../user.json");

module.exports.getAlluser = (req, res) => {
  res.send(user);
};
module.exports.saveAuser = (req, res) => {
  const userInfo = req.body;
  user.push(userInfo);
  res.send(user);
};
