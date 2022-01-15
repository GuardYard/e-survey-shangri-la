const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const hash = (password) => {
    return bcrypt.hashSync(password, 10);
}

const authenticate = async (loginData) => {
    const email = loginData.email;
    const password = loginData.password
    let userLogged = {};
    await User.findOne({ email })
        .then((user) => {
            if(bcrypt.compareSync(password, user.password)){
                userLogged = user;
            }
        })
        .catch(err => console.log(err))

    return userLogged;
}

module.exports = {
    authenticate,
    hash
};