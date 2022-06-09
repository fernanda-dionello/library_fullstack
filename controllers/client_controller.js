const client_business = require('../business/client_business');
const { returnError } = require('./utils/return-error');

exports.listClients = async (req, resp) => {
    try{
        const res = await client_business.listAllClients();
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
};

exports.listClientByRegistrationNumber = async (req, resp) => {
    const registration_number = req.params.registration_number; 
    try{
        const res = await client_business.listClientByRegistrationNumber(registration_number);
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
}

exports.createClients = async (req, resp) => {
    const clients = req.body;
    try{ 
        await client_business.insertClients(clients);
        resp.status(201).json("Client(s) created successfully");
    }
    catch(e) {
        returnError(e, resp);       
    }   
}

exports.updateClient = async (req, resp) => {
    const registration_number = req.params.registration_number; 
    const client = req.body;
    try{
        await client_business.updateClient(registration_number, client);
        resp.json("Client updated successfully");
    } catch (e) {
        returnError(e, resp);
    };
}

exports.removeClient = async (req, resp) => {
    const registration_number = req.params.registration_number; 
    try{
        await client_business.removeClient(registration_number);
        resp.json("Client deleted successfully");
    } catch (e) {
        returnError(e, resp);
    };
}