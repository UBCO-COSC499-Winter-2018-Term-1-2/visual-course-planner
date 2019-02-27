const express = require('express');
const router = express.Router();
const Plan = require('../../models/Plan');


router.get('/:id', (req, res) => {
    const UserId = req.params.id;
    Plan.getPlanForUser(UserId, (err, data) => {
      if (err == null) {
        res.send(data);
      } else {
        console.error("Couldn't retrieve plan");
      }
    });
  });

  router.get('/user/:id', (req, res) => {
  
    Plan.getPlanList(req.params.id, (err, data) => {
      if (err == null) {
        res.send(data);
      } else {
        console.error("Couldn't retrieve plan");
      }
    });
  });

router.post('/:id/favourite' , (req,res) => {
  const UserId = req.params.id;
  Plan.planMakeFavourite(UserId, (err,data) => {
    if (err = null) {
      res.send(data);
    }else{
      console.error("unable to favourite plan")
    }
  });
});


router.get('/:id', (req, res) => {
  
  Plan.getNotes(User, (err, data) => {
    if (err == null) {
      res.send(data);
    } else {
      console.error("No notes");
    }
  });
});


module.exports = router;
