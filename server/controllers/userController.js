const userRepository = require('../repositories/userRepository');
const restifyError = require('restify-errors');
const userValidator = require('../Validators/userValidator');
const transactionRepo = require('../repositories/transactionRepo');
const moment = require('moment');

const register = (req, res, next) => {
    const { name, gender, durations } = req.body;
    (async () => {
        const transaction = await transactionRepo.getTransaction();
        try {
            userValidator.validateRegistration(req.body);
            const user = await userRepository.getUser({ name, gender });

            if (user) {
                //only update the duration
                const durationData = durations.map(duration => {
                    return {
                        UserId: user.id,
                        sleepTimeDuration: duration.sleepTimeDuration,
                        sleepDate: moment(duration.date).unix()
                    }
                });
                
                const sleepDates =  durationData.map(duration => duration.sleepDate);
                if (userRepository.getDurations(sleepDates)) {
                    return new restifyError.BadRequestError(`Duration Dates exist for ${JSON.stringify(sleepDates)}`);
                }
               
                userRepository.updateDuration(durationData);
            } else {
                //create everything
                const user = await userRepository.createUser({ name, gender }, transaction);
                const durationData = durations.map(duration => {
                    return {
                        UserId: user.id,
                        sleepTimeDuration: duration.sleepTimeDuration,
                        sleepDate: moment(duration.date).unix()
                    }

                });

                await userRepository.createDurationBulk(durationData, transaction);
                await transaction.commit();
            }

            res.send(200, { message: 'successful' });
            return next();
        } catch (error) {
            console.log('eeeee', error)
            await transaction.rollback();
            if (error instanceof Error) {
                return next(error);
            }
            return next(new restifyError.BadRequestError('Something went wrong!'));
        }
    })();

}

const profile = async (req, res) => {
    const users = await userRepository.getUsers();
    const mappedUsers = users.map(user => {
        return {
            name: user.name,
            gender: user.gender,
            durations: user.durations.map(({sleepTimeDuration, sleepDate}) => ({
                sleepTimeDuration, 
                date: moment.unix(sleepDate).format('YYYY-MM-DD')
            }))
        }
    });
    
    res.send(200, mappedUsers );
}
module.exports = {
    register,
    profile
}
