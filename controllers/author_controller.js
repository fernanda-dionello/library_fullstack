const author_business = require('../business/author_business');
const { returnError } = require('./utils/return-error');

exports.listAuthors = async (req, resp) => {
    try{
        const res = await author_business.listAllAuthors();
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
};

exports.listAuthorById = async (req, resp) => {
    const id = req.params.id; 
    try{
        const res = await author_business.listAuthorById(id);
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
}

exports.createAuthors = async (req, resp) => {
    const authors = req.body;
    try{ 
        await author_business.insertAuthors(authors);
        resp.status(201).json("Author(s) created successfully");
    }
    catch(e) {
        returnError(e, resp);       
    }   
}

exports.removeAuthor = async (req, resp) => {
    const id = req.params.id; 
    try{
        await author_business.removeAuthor(id);
        resp.json("Author deleted successfully");
    } catch (e) {
        returnError(e, resp);
    };
}

