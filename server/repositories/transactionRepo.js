const { sequelize } = require('../models');

const _getTransaction = async () => {
    return sequelize.transaction({ autocommit: false });
}

module.exports = {
    getTransaction: _getTransaction
}