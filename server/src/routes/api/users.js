const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.post('/:id/user', (req, res) => {
    const UserId = req.params.id;
    userChange.changePassword(UserId, (err, data) => {
      if (err == null) {
        res.send(data);
      } else {
        console.error("Couldn't change password");
      }
    });
  });

  router.post('/:id/user', (req, res) => {
    const UserId = req.params.id;
    userChange.updateUser(UserId, (err, data) => {
      if (err == null) {
        res.send(data);
      } else {
        console.error("Couldn't change info");
      }
    });
  });

  module.exports = router;