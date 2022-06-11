const crypto = require('crypto');
const isEmpty = require('lodash/isEmpty');
let err = {message:"", status:400};

exports.validateUserLogin = (user) => {
    validateFields(user);
}

validateFields = (user) => {
    if (isEmpty(user)) {
        err.message = "User data is missing.";
        throw err;
    }
    if(!user.username){
        err.message = "User doesn't have field username";
        throw err;
    }
    if(!user.password){
        err.message = "User doesn't have field password";
        throw err;
    }
}


exports.validateUser = (userFounded, userBody) => {
    if(userFounded.rowCount == 0) {
        err = {message:`No user with username ${userBody.username} found.`, status: 404};
        throw err;
    }

    let encryptPassword = crypto.createHash('sha1');
    encryptPassword.update(userBody.password);

    if(userFounded.rows[0].password !== encryptPassword.digest('hex')){
        err = {message:"Password incorrect.", status: 401};
        throw err;
    }
}