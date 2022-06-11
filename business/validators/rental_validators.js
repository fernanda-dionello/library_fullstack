const client_validators = require('./client_validators');
const book_validators = require('./book_validators');
const rental_repository = require('../../repository/rental_repository');

let err = {message:"", status:400};

exports.validateRentsFounded = (rents) => {
    if(rents.rowCount == 0){
        err = {message:"No rents found.", status: 404};
        throw err;
    }
}

validateRentalBody = (rents, borrow) => {
    if (rents.length == 0) {
        err.message = "Rental data is missing.";
        throw err;
    }
    if (borrow && rents.length > 3) {
        err.message = "You cannot rent more than 3 books at time.";
        throw err;
    } 
    for(const rental of rents) {
        validateRental(rental);
    }
}

validateClientRegistrationNumber = (client_registration_number) => {
    if(!client_registration_number){
        err.message = "Rental doesn't have field client registration number";
        throw err;
    }
}

validateBookId = (book_id) => {
    if(!book_id){
        err.message = "Rental doesn't have field book id";
        throw err;
    }
}

validateRental = (rental) => {
    validateClientRegistrationNumber(rental.client_registration_number)
    validateBookId(rental.book_id)
}

validateIfClientsAreEqual = (rents) => {
    if(!rents.every(rental => rental.client_registration_number == rents[0].client_registration_number)){
        err.message = "The client should be the same in all rents";
        throw err;
    }
}

validateRentalClientRegistrationNumber = async(rents) => {
    validateIfClientsAreEqual(rents);
    await client_validators.validateClientRegistrationNumber(rents[0].client_registration_number);
}

validateReturnedClientsRegistrationNumber = async(rents) => {
    for(const rental of rents) {
        await client_validators.validateClientRegistrationNumber(rental.client_registration_number);
    };
}

validateIfBooksAreDifferent = (rents) => {
    const uniqueBooks = new Set(rents.map(rent => rent.book_id));
    if (uniqueBooks.size !== rents.length) {
        err.message = "The books should be different in all rents";
        throw err;
    }
}

validateRentalBookId = async(rents, borrow) => {
    borrow && validateIfBooksAreDifferent(rents);
    for(const rental of rents) {
        await book_validators.validateBookId(rental.book_id)
    };
}

validateBookAvailability = async(rents) => {
    for(const rental of rents) {
        const booksRent = await rental_repository.getBookAvailability(rental.book_id);
        if (booksRent.rows[0].count > 0) {
            err = {message:`Book with id ${rental.book_id} already taken by another client.`, status:403};
            throw err;
        };
    };
}

validateRentBooksByClient = async(rents) => {
    const booksRentByClient = await rental_repository.getClientActiveBooks(rents[0].client_registration_number);
    
    if (parseInt(booksRentByClient.rows[0].count) + rents.length > 3) {
        err = {message:"Client cannot take more than 3 books at time.", status:403};
        throw err;
    };
}

validateRentalExistency = async(rents) => {
    for(const rental of rents) {
        const rentalExistency = await rental_repository.getRental(rental.book_id, rental.client_registration_number);
        if (rentalExistency.rowCount == 0) {
            err = {message:`Rental with client id ${rental.client_registration_number} and book id ${rental.book_id} not found.`, status:403};
            throw err;
        };
    };
}

exports.validateBorrow = async (rents) => {
    validateRentalBody(rents, true);
    await validateRentalClientRegistrationNumber(rents);
    await validateRentalBookId(rents, true);
    await validateBookAvailability(rents);
    await validateRentBooksByClient(rents);
}

exports.validateReturn = async (rents) => {
    validateRentalBody(rents, false);
    await validateReturnedClientsRegistrationNumber(rents);
    await validateRentalBookId(rents, false);
    await validateRentalExistency(rents);
}
