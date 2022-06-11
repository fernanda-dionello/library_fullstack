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

exports.borrow = async (req, resp) => {
    const rents = req.body;
    try{ 
        await rental_business.borrow(rents);
        resp.status(201).json("Book(s) rent with success!");
    }
    catch(e) {
        returnError(e, resp);       
    }   
}