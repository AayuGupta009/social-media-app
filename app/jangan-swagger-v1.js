const { Router } = require('express');

const path = require('path');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load(path.resolve(__dirname, '../docs/v1/user/swagger.yaml'));
const swaggerUi = require('swagger-ui-express');


const router = Router();


router.get('/docs.json', (req, res) => res.send(swaggerDocument));
router.use('/docs', swaggerUi.serve, (req, res) => res.send(swaggerUi.generateHTML(swaggerDocument)) );


module.exports = router;
