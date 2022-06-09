const client_repository = require('../repository/client_repository');
const client_validators = require('./validators/client_validators');

const { mapClientFieldsToUpdate } = require('../business/utils/map-client-fields-to-update');

exports.listAllClients = async () => {
    try{
        const clients = await client_repository.getClients();
        client_validators.validateClientsFounded(clients);
        return clients.rows;

    } catch (err) {
        throw err;
    };
};

exports.listClientByRegistrationNumber = async (registration_number) => {
    try{
        const clients = await client_repository.getClientByRegistrationNumber(registration_number);
        client_validators.validateClientFounded(clients, registration_number);
        return clients.rows;
    } catch (err) {
        throw err;
    };
}

exports.insertClients = async (clients) => {
    try{
        client_validators.validateClientCreation(clients);
        return await client_repository.postClients(clients);
    } catch(err) {
        throw err;
    }
}

exports.updateClient = async (registration_number, client) => {
    try{
        await client_validators.validateClientUpdate(client, registration_number);
        const mappedClient = await mapClientFieldsToUpdate(client, registration_number);
        return await client_repository.updateClient(mappedClient, registration_number);
    } catch(err) {
        throw err;
    }
}

exports.removeClient = async (registration_number) => {
    try{
        await client_validators.validateClientRegistrationNumber(registration_number);
        return await client_repository.deleteClient(registration_number);
    } catch (err) {
        throw err;
    };
}