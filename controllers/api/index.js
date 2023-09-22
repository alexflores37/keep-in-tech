const router = require('express').Router();
const sportsRoutes = require('./sportsRoutes');

router.use('/sports', sportsRoutes);

module.exports = router;