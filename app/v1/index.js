const { Router } = require('express');

const userController = require('./user');

const router = Router();

router.use('/user', userController);

module.exports = router;
