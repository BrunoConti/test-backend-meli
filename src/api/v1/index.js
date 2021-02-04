const express = require('express');

const routesV1 = require('./routes/items');

const router = express.Router();

router.use('/items', routesV1);

module.exports = router;
