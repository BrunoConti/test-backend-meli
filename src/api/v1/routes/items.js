/* eslint-disable linebreak-style */
const express = require('express');

const router = express.Router();
const itemsController = require('../controllers/ItemsController');

router.get('/', itemsController.findAll);
router.get('/:id', itemsController.findOne);

module.exports = router;
