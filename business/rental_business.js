const rental_repository = require('../repository/rental_repository');
const rental_validators = require('./validators/rental_validators');

exports.listAllRents = async () => {
    try{
        const rents = await rental_repository.getRents();
        rental_validators.validateRentsFounded(rents);
        return rents.rows;

    } catch (err) {
        throw err;
    };
};