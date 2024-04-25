const { User, Duration, sequelize } = require('../models');

const createUser = (data, transaction = null) => {
    return User.create(data, { transaction });
}

const _getUser = data => {
    return User.findOne({
        where: data
    });
}

const getUsers = (orderBy='desc', limit=7) => {
    const queryOptions = {
        order: [
            ['createdBy', orderBy],
        ],
        attributes: ['name', 'gender'],
        include: [
            { 
                model: Duration, as: 'durations',
                order: [
                    ['createdBy', orderBy],
                ], 
                limit: limit,
                attributes: ['sleepDate', 'sleepTimeDuration'],         
            }
        ],
    }
    return User.findAll(queryOptions);
}

const createDurationBulk = (data, transaction = null) => {
    return Duration.bulkCreate(data, { transaction });
}

const updateDuration = (data, transaction = null) => {
    return Duration.create(data, { transaction });
}

const getDurations = (sleepDates) => {
    return Duration.findOne({
        attributes: ['sleepDate'],
        where: {sleepDate:  sleepDates}
    })
}
const getOne = (id) => {
    return User.findOne({
        where: {id}
    });
}

const getAll = (id) => {
    return User.findAll();
}
module.exports = {
    createUser,
    getUser: _getUser,
    getUsers,
    createDurationBulk,
    updateDuration,
    getDurations
}