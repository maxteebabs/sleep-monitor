const restifyError = require('restify-errors');

const validateRegistration = (data) => {
    if(!data.name) {
        throw new restifyError.BadRequestError('Name field is required!');
    }
    if(!data.gender) {
        throw new restifyError.BadRequestError('Gender field is required!');
    }
    if(!['Male', 'Female'].includes(data.gender)) {
        throw new restifyError.BadRequestError('Gender field is either Male or Female!');
    }
    if(!data.durations || !data.durations.length) {
        throw new restifyError.BadRequestError('Durations field is required');
    }
    data.durations.forEach(duration => {
        if(duration.sleepTimeDuration > 24 || duration.sleepTimeDuration < 0) {
            throw new restifyError.BadRequestError('Sleep time duration field should be between 0 and 24 hours!');
        } 
    })
    return true;
}
module.exports = {
    validateRegistration
}