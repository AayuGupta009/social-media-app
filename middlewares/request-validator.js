const Joi = require('joi');
const HttpStatus = require('http-status');

const validate = (schema, source = 'body') => async (req, res, next) => {
    const data = req[source];

    try {
        // eslint-disable-next-line require-atomic-updates
        if(req['files'] && Object.entries(req['files']).length !== 0 && req['files'].constructor !== Object) {
            for(const [key, value] of Object.entries(data)) {
                if(typeof(value) === "string") data[key] = JSON.parse(value)
            }
        }
        

        req.validated = await Joi.validate(data, schema, {
            stripUnknown: true,
            convert: true,
            abortEarly: false
        });
    }
    catch (err) {
        err.status = HttpStatus.BAD_REQUEST;
        if (err.details) {
            err.message = (err.details ? err.details[0] : {}).message;
        }

        console.log('Validation error: ', err.message);

        return next(err);
    }

    return next();
};

const validateParams = (schema) => async (req, res, next) => {
    const data = req.params;

    try {
        // eslint-disable-next-line require-atomic-updates
        if(req['files'] && Object.entries(req['files']).length !== 0 && req['files'].constructor !== Object) {
            for(const [key, value] of Object.entries(data)) {
                if(typeof(value) === "string") data[key] = JSON.parse(value)
            }
        }
        

        req.validated = await Joi.validate(data, schema, {
            stripUnknown: true,
            convert: true,
            abortEarly: false
        });
    }
    catch (err) {
        err.status = HttpStatus.BAD_REQUEST;
        if (err.details) {
            err.message = (err.details ? err.details[0] : {}).message;
        }

        console.log('Validation error: ', err.message);

        return next(err);
    }

    return next();
};

module.exports = {
    validate,
    validateParams
};
