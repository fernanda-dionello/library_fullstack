const user_validators = require('../business/validators/user_validators');
const user_repository = require('../repository/user_repository');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET;

exports.userValidation = async (user) => {
    try{
        user_validators.validateUserLogin(user);
        const userFounded = await user_repository.findUsername(user.username);
        user_validators.validateUser(userFounded, user);

        const token = jwt.sign({
            id: userFounded.rows[0].id,
            nome: userFounded.rows[0].username
        }, secret, {expiresIn: "1h"});
        return token;

    } catch (err) {
        throw err;
    };
};

exports.tokenValidation = (token, next) => {
    try {
        user_validators.validateToken(token);
        jwt.verify(token, secret, (error, payload) => {
            if(error){
                err = {message:"Invalid Token", status: 403};
                throw err;       
            }
            else{
                // console.log("User id: "+ payload.id);
                next();
            };
        });
    } catch (err) {
        throw err;
    };   
}