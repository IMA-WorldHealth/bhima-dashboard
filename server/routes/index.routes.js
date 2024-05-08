const express = require('express');
const { dashboard } = require('../controllers/dashboard');
const root = require('./root.routes');

const router = express.Router();

router.get('/', root);
router.get('/dashboard', dashboard);

module.exports = router;