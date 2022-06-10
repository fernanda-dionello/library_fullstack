const book_business = require('../business/book_business');
const { returnError } = require('./utils/return-error');

exports.listAvailableBooks = async (req, resp) => {
    try{
        const res = await book_business.listAvailableBooks();
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
};

exports.listBooks = async (req, resp) => {
    try{
        const res = await book_business.listAllBooks();
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
};

exports.listBookById = async (req, resp) => {
    const id = req.params.id; 
    try{
        const res = await book_business.listBookById(id);
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
}

exports.listBookByAuthorId = async (req, resp) => {
    const id = req.params.id; 
    try{
        const res = await book_business.listBookByAuthorId(id);
        resp.json(res);
    } catch (e) {
        returnError(e, resp);
    };
}

exports.createBooks = async (req, resp) => {
    const books = req.body;
    try{ 
        await book_business.insertBooks(books);
        resp.status(201).json("Book(s) created successfully");
    }
    catch(e) {
        returnError(e, resp);       
    }   
}

exports.updateBook = async (req, resp) => {
    const id = req.params.id; 
    const book = req.body;
    try{
        await book_business.updateBook(id, book);
        resp.json("Book updated successfully");
    } catch (e) {
        returnError(e, resp);
    };
}

exports.removeBook = async (req, resp) => {
    const id = req.params.id; 
    try{
        await book_business.removeBook(id);
        resp.json("Book deleted successfully");
    } catch (e) {
        returnError(e, resp);
    };
}