const  mysql = require('mysql');
const  config = require('../../config/config');

const getUser = data => {
    return new Promise((rs,rj)=>{
        if (!data || !data.email) return rs({err:"Email required", user:null});
        const db = mysql.createConnection(config.db);
        db.connect();
        db.query(`SELECT * FROM User WHERE email = '${data.email}'`,
            (err,user)=> {

                if (err) return rs({err:err, user:null});
                if (!user) return rs({err:"Login or password invalid", user:null});
                if (user)
                    user = JSON.parse(JSON.stringify(user))[0];
                return rs({err:null, user:user});
            });
        db.end();
    });

};
const createUser = data => {
    return new Promise(async (rs,rj)=>{
        if (!data.email) return rs({err:"Email required", user:null});
        if (!data.password) return rs("Password required", null);
        const {user} = await getUser(data);
        if (user) return rs({err:'Email used', user:null});

        const db = mysql.createConnection(config.db);
        db.connect();
        db.query(`INSERT INTO User (email, password, accessToken, name) VALUES 
        ('${data.email}', '${data.password}', '${data.accessToken}', '${data.name}')`,
            async (error,result)=> {
                if (error) return rs({err:error, user:null});
                if (!result) return rs({err:"Data invalid", user:null});
                const {err, user} = await getUser(data);
                if (err) return rs({err:err, user:null});
                if (!user) return rs({err:"Data invalid", user:null});

                rs({err:"Data invalid", user});
            });
        db.end();
    });
};
const updateUser = () => {

};
const deleteUser = () => {

};
const errorList =  {
        AUTH_DATA_INVALID: 'Login or password invalid',

    };

module.exports = {getUser, createUser, updateUser, deleteUser, errorList};
