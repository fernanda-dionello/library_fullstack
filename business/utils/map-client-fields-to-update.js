const client_repository = require('../../repository/client_repository');

exports.mapClientFieldsToUpdate = async (client, registration_number) => {
    const clientDb = await client_repository.getClientByRegistrationNumber(registration_number);

    return {
        name: client.name || clientDb.rows[0].name,
        cellphone: client.cellphone || clientDb.rows[0].cellphone
    }
}