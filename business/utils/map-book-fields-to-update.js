const book_repository = require('../../repository/book_repository');

exports.mapBookFieldsToUpdate = async (book, id) => {
    const bookDb = await book_repository.getBookById(id);
    return {
        isbn: book.isbn || bookDb.rows[0].isbn,
        name: book.name || bookDb.rows[0].name,
        author: book.author || bookDb.rows[0].author,
        publishing_company: book.publishing_company || bookDb.rows[0].publishing_company,
        year: book.year || bookDb.rows[0].year
    }
}