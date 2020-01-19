const {createTables} = require('../../servises/db');

module.exports = (config) =>{
    return createTables('User',config,{
        id: 'int AUTO_INCREMENT',
        name: 'VARCHAR(100)',
        email: 'VARCHAR(100)',
        password: 'VARCHAR(100)',
        accessToken: 'VARCHAR(255)',
        "PRIMARY KEY": '(id)',
        UNIQUE: '(email)',
    });
};