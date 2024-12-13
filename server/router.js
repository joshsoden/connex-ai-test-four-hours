const Ajv = require('ajv');
const cors = require('cors');
const express = require('express');
const router = express.Router();

const config = require('./config.js');

const ajv = new Ajv();

router.use(cors());

router.get('/time', (req, res) => {
    let timeObj = {epoch: Date.now()};
    res.send(ajv.validate(config.schema, timeObj) ? JSON.stringify(timeObj) : 422);
});

module.exports = router;