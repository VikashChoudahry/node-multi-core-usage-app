const router = require('express').Router();
const mathOpController = require('./math-operation');
const reportController = require('./report');

router.use('/math-operations', mathOpController);
router.use('/reports', reportController);

module.exports = router;
