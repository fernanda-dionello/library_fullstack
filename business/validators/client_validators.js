const client_repository = require('../../repository/client_repository');
let err = {message:"", status:400};

exports.validateClientsFounded = (clients) => {
    if(clients.rowCount == 0){
        err = {message:"No clients found.", status: 404};
        throw err;
    }
}

exports.validateClientFounded = (clients, registration_number) => {
    if(clients.rowCount == 0){
        err = {message:`No client with registration number ${registration_number} found.`, status: 404};
        throw err;
    }
}

exports.validateClientCreation = (clients) => {
    for(const client of clients) {
        validateClient(client);
    }
}

exports.validateClientUpdate = async (client, registration_number) => {
    await this.validateClientRegistrationNumber(registration_number);
    if (!client) {
        err.message = "Client data is missing.";
        throw err;
    }
    else if(!client.name && !client.cellphone) {
        err.message = "Client must have either name or cellphone fields.";
        throw err;
    }
}

exports.validateClientRegistrationNumber = async (registration_number) => {
    const clientSelected = await client_repository.getClientByRegistrationNumber(registration_number);
    if(clientSelected.rowCount == 0) {
        err = {message:`No client with registration number ${registration_number} found.`, status: 404};
        throw err;
    }
}

validateClientName = (name) => {
    if(!name){
        err.message = "Client doesn't have field name";
        throw err;
    }
}

validateClientCellphone = (cellphone) => {
    if(!cellphone){
        err.message = "Client doesn't have field cellphone";
        throw err;
    }
}

validateClient = (client) => {
    validateClientName(client.name)
    validateClientCellphone(client.cellphone)
}