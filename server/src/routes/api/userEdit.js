const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');

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