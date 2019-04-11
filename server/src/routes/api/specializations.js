const express = require('express');
const router = express.Router();
const Specialization = require('../../models/Specialization');


/**
 * @route GET api/specializations/:id
 * @desc Get all specializations for a degree
 * @access Private
 */
router.get('/:id', (req, res) => {
  Specialization.getSpecializationsForDegree(req.params.id)
    .then(data => {
      console.log({"Sending data": data});
      res.send(data);
    })
    .catch(err => {
      console.error("Couldnt get specializations: " + err);
    });
});

module.exports = router;