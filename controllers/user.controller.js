const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
module.exports.getRandomUser = (req, res) => {
  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data).users;
    const randomIndex = Math.floor(Math.random() * users.length);
    res.json(users[randomIndex]);
  });
};
module.exports.getAlluser = (req, res) => {
  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data).users;
    const limit = req.query.limit ? parseInt(req.query.limit) : users.length;
    res.json(users.slice(0, limit));
  });
};
module.exports.saveAuser = (req, res) => {
  const newUser = req.body;
  if (
    !newUser.id ||
    !newUser.gender ||
    !newUser.name ||
    !newUser.contact ||
    !newUser.address ||
    !newUser.photoUrl
  ) {
    res.status(400).send("Missing required properties");
  } else {
    fs.readFile("user.json", (err, data) => {
      if (err) throw err;
      const users = JSON.parse(data).users;
      newUser.id = uuidv4();
      users.push(newUser);
      fs.writeFile("user.json", JSON.stringify({ users }), (err) => {
        if (err) throw err;
        res.json(newUser);
      });
    });
  }
};
module.exports.updateUser = (req, res) => {
  const updatedUser = req.body;
  if (
    !updatedUser.id ||
    !updatedUser.gender ||
    !updatedUser.name ||
    !updatedUser.contact ||
    !updatedUser.address ||
    !updatedUser.photoUrl
  ) {
    res.status(400).send("Missing required properties");
  } else {
    fs.readFile("user.json", (err, data) => {
      if (err) throw err;
      const users = JSON.parse(data).users;
      const index = users.findIndex((user) => user.id === req.params.id);
      if (index === -1) {
        res.status(404).send("User not found");
      } else {
        users[index] = updatedUser;
        fs.writeFile("user.json", JSON.stringify({ users }), (err) => {
          if (err) throw err;
          res.json(updatedUser);
        });
      }
    });
  }
};

module.exports.bulkUpdate = (req, res) => {
  const userIds = req.body;
  // BONUS: validate the body
  if (!Array.isArray(userIds)) {
    res.status(400).send("Invalid request body");
    return;
  }
  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data).users;
    // Update user data for each user id in the request body
    const updatedUsers = [];
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      const index = users.findIndex((user) => user.id === userId);
      if (index !== -1) {
        // Update user data with the new data
        const oldUser = users[index];
        const updatedUser = { ...oldUser, ...req.body };
        users[index] = updatedUser;
        updatedUsers.push(updatedUser);
      }
    }
    fs.writeFile("user.json", JSON.stringify({ users }), (err) => {
      if (err) throw err;
      res.send(updatedUsers);
    });
  });
};

module.exports.deleteUser = (req, res) => {
  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data).users;
    const index = users.findIndex((user) => user.id === req.params.id);
    if (index === -1) {
      res.status(404).send("User not found");
    } else {
      users.splice(index, 1);
      fs.writeFile("user.json", JSON.stringify({ users }), (err) => {
        if (err) throw err;
        res.status(204).send();
      });
    }
  });
};
