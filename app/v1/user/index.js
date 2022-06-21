const {
    Router
} = require('express');
const userController = require('./controller');
const {
    validate
} = require('middlewares');
const schema = require('./schema');

const router = Router({
    mergeParams: true
});

router.post(
    '/signup',
    validate(schema.signup),
    userController.signup
);

router.get('/verify/email/:email/:token', userController.verifyEmail);

router.post(
    '/register/phone',
    validate(schema.phoneRegister),
    userController.registerPhone
);

router.post(
    '/verify/phone',
    validate(schema.verifyOTP),
    userController.verifyOTP
);

router.post('/otp', validate(schema.getOTP), userController.getOTP);

module.exports = router;
