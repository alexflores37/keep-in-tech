const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./blogRoutes');

router.use('/', blogRoutes);
router.use('/api', apiRoutes);

module.exports = router;

