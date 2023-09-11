const express = require('express');

const router = express.Router();

const newsletterController = require('../controllers/newsletter');

router.post('/', newsletterController.subscribe);

module.exports = router;