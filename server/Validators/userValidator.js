const restifyError = require('restify-errors');

const validateRegistration = (data) => {
    if(!data.name) {
        throw new restifyError.BadRequestError('Name field is required!');
    }
    if(!data.gender) {
        throw new restifyError.BadRequestError('Gender field is required!');
    }
    return true;
}
module.exports = {
    validateRegistration
}