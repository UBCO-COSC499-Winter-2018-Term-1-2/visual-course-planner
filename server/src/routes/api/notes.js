const express = require('express');
const router = express.Router();
const Plan = require('../../models/Plan');


router.get('/:id', (req, res) => {
  
    Note.getNotes(User, (err, data) => {
      if (err == null) {
        res.send(data);
      } else {
        console.error("No notes");
      }
    });
  });

  module.exports = router;
  