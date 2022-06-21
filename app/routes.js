const { Router } = require('express');
const routesV1 = require('./v1');

const router = Router();

router.use('/jangan/v1', routesV1);

const swaggerRouterV1 = require('./jangan-swagger-v1'); /* eslint-disable-line */
router.use('/jangan/v1', swaggerRouterV1);

module.exports = router;
