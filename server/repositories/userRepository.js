// const { Op } = require('sequelize');
const { User, Duration } = require('../models');

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

const updateDuration = (data, user, transaction = null) => {
    return Duration.update(data, 
        {
            include: [
                { 
                    model: User, as: 'user', 
                    attributes: ['name', 'gender'],      
                    where: {
                        name: user.name,
                        gender: user.gender
                    }, 
                    required: true
                }
            ],
            where: { name: user.name, gender: user.gender}
        },
        { transaction });
}

const deleteDurations = (name, gender, sleepDates) => {
    const durations =  Duration.findAll({
        attributes: ['id'],
        include: [
            { 
                model: User, as: 'user', 
                attributes: [],      
                where: {
                    name: name,
                    gender: gender
                }, 
                required: true
            }
        ],
        where: {
            sleepDate: sleepDates
        }
    });
    return Duration.destroy({where: {id: durations} })
}

const getDurations = (name, gender, sleepDates) => {
    return Duration.findOne({
        attributes: ['sleepDate'],
        include: [
            { 
                model: User, as: 'user', 
                attributes: ['name', 'gender'],      
                where: {
                    name: name,
                    gender: gender
                }, 
                required: true
            }
        ],
        where: {
            sleepDate: sleepDates
                // [Op.in]: sleepDates.map(timestamp => sequelize.literal(`FROM_UNIXTIME(${timestamp})`))
            // }
        }
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
    getDurations,
    deleteDurations,
    
}