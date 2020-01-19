const bCrypt = require('bcrypt');
const {generateAccesToken} = require('../../servises/token');
const {getUser, createUser, errorList} = require('./usersServis');

const signin = async (data) => {
    let {email, password} = data;
    if (!password || !email) return ({err: errorList.AUTH_DATA_INVALID, result:null});

    const {err, user} = await getUser({email, password});
    if (err || !user) return ({err: err || errorList.AUTH_DATA_INVALID, result:null});
    const isValid = await bCrypt.compareSync(password, user.password);
    delete user.password;
    if (isValid) {
        return ({err:null, user});
    } else {
        return ({err:errorList.AUTH_DATA_INVALID, result:null})
    }
};

const signup = async (data) => {
    let {email, password, name} = data;
    password = await  bCrypt.hash(password, bCrypt.genSaltSync());

    const {err, user} = await createUser({email, password, name, accessToken:generateAccesToken(email) });
    delete user.password;
    if (user) {
        return ({err:null, user});
    } else {
        return ({err:err, result:null})
    }
};


module.exports = {signin, signup};