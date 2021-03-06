const user_repository = require('../repository/user_repository');
const user_business = require('../business/user_business');
const { returnError } = require('./utils/return-error');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET;

exports.userValidation = async (req, resp) => {
    const user = req.body;
    try{ 
        const token = await user_business.userValidation(user);
        resp.status(201).json({"token":token});
    }
    catch(e) {
        returnError(e, resp);       
    }
};

exports.tokenValidation = (req, resp, next) => {
    const token = req.get("x-session-token");
    try{ 
        user_business.tokenValidation(token, next);
    }
    catch(e) {
        returnError(e, resp);       
    }
};