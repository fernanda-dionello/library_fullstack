const rental_business = require('../business/rental_business');
const { returnError } = require('./utils/return-error');

exports.listRents = async (req, resp) => {
    try{
        const res = await rental_business.listAllRents();
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
};
