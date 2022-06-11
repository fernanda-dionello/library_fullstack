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


exports.borrow = async (rents) => {
    try{
        await rental_validators.validateBorrow(rents);
        return await rental_repository.borrow(rents);
    } catch (err) {
        throw err;
    }; 
}

exports.return = async (rents) => {
    try{
        await rental_validators.validateReturn(rents);
        let msg = '';
        for(const rental of rents) {
            const rentalDb = await rental_repository.getRental(rental.book_id, rental.client_registration_number);
            const rental_id = rentalDb.rows[0].id;
            const end_date = rentalDb.rows[0].end_date;
            const now = new Date();
            await rental_repository.return(rental_id);
            if (end_date.getTime() < now.getTime()) {
                const delay = Math.abs(now.getTime() - end_date.getTime());
                const delay_days = Math.floor(delay / (1000 * 3600 * 24));
                msg = msg.concat(`Book with id ${rental.book_id} returned with success by client ${rental.client_registration_number} with ${delay_days} of delay.\n`);
            } else {
                msg = msg.concat(`Book with id ${rental.book_id} returned with success by client ${rental.client_registration_number}!\n`);
            }
        }
        return msg;
    } catch (err) {
        throw err;
    }; 
}