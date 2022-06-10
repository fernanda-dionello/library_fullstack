const book_repository = require('../repository/book_repository');
const book_validators = require('./validators/book_validators');

const { mapAuthorNameToAuthorId } = require('../business/utils/map-author-name-to-author-id');
const { mapPublishingCompanyNameToPublishingCompanyId } = require('../business/utils/map-publishing-company-name-to-publishing-company-id');
const { mapBookFieldsToUpdate } = require('../business/utils/map-book-fields-to-update');

exports.listAvailableBooks = async () => {
    try{
        const books = await book_repository.getAvailableBooks();
        book_validators.validateAvaliableBooksFounded(books);
        return books.rows;

    } catch (err) {
        throw err;
    };
};

exports.listAllBooks = async () => {
    try{
        const books = await book_repository.getBooks();
        book_validators.validateBooksFounded(books);
        return books.rows;

    } catch (err) {
        throw err;
    };
};

exports.listBookById = async (id) => {
    try{
        const books = await book_repository.getBookById(id);
        book_validators.validateBookFounded(books, id);
        return books.rows;
    } catch (err) {
        throw err;
    };
}

exports.listBookByAuthorId = async (id) => {
    try{
        const books = await book_repository.getBookByAuthorId(id);
        book_validators.validateBookByAuthorFounded(books, id);
        return books.rows;
    } catch (err) {
        throw err;
    };
}

exports.insertBooks = async (books) => {
    try{
        book_validators.validateBooksCreation(books);
        await mapAuthorNameToAuthorId(books);
        await mapPublishingCompanyNameToPublishingCompanyId(books);
        return await book_repository.postBooks(books);
    } catch(err) {
        throw err;
    }
}

exports.updateBook = async (id, book) => {
    try{
        await book_validators.validateBookUpdate(book, id);
        const mappedBook = await mapBookFieldsToUpdate(book, id);
        await mapAuthorNameToAuthorId([mappedBook]);
        await mapPublishingCompanyNameToPublishingCompanyId([mappedBook]);
        console.log('book', mappedBook)
        return await book_repository.updateBook(mappedBook, id);
    } catch(err) {
        throw err;
    }
}

exports.removeBook = async (id) => {
    try{
        await book_validators.validateBookId(id);
        return await book_repository.deleteBook(id);
    } catch (err) {
        throw err;
    };
}