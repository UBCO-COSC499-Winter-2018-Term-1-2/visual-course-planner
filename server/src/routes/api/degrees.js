const express = require('express');
const router = express.Router();
const Degree = require('../../models/Degree');


/**
 * @route GET api/degrees
 * @desc Get all degrees
 * @access Private
 */
router.get('/', (req, res) => {
  Degree.getDegrees()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error("Couldnt get degrees: " + err);
    });
});

module.exports = router;