const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Item.getAllItems((err, items) => {
        if (err) {
            res.json(err);
        } else {
            res.json(items);
        }
    })
});

// @route   GET api/items/:id
// @desc    Get all items
// @access  Public
router.get('/:id', (req, res) => {
    Item.getItemById(req.params.id, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            console.log(results);
            res.json(results);
        }
    })
});

// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post('/', (req, res) => {
    Item.addItem(req.body, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            const item = Item.getItemById(results.insertId, (err, item) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(item[0]);
                }
            });
        }
    })
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.deleteItem(req.params.id, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
    })
})


module.exports = router;