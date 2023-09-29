const router = require('express').Router();
// const sportsRoutes = require('./sportsRoutes');
const userRoutes = require('./userRoutes');

// router.use('/sports', sportsRoutes);
router.use('/user', userRoutes);

module.exports = router;