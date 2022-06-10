const book_repository = require('../../repository/book_repository');

let err = {message:"", status:400};

exports.validateBooksFounded = (books) => {
    if(books.rowCount == 0){
        err = {message:"No books found.", status: 404};
        throw err;
    }
}

exports.validateAvaliableBooksFounded = (books) => {
    if(books.rowCount == 0){
        err = {message:"No books available founded.", status: 404};
        throw err;
    }
}

exports.validateBookFounded = (books, id) => {
    if(books.rowCount == 0){
        err = {message:`No book with id ${id} found.`, status: 404};
        throw err;
    }
}

exports.validateBookByAuthorFounded = (books, id) => {
    if(books.rowCount == 0){
        err = {message:`No book written by author id ${id} found.`, status: 404};
        throw err;
    }
}

exports.validateBooksCreation = (books) => {
    for(const book of books) {
        validateBook(book);
    }
}

exports.validateBookId = async (id) => {
    const bookSelected = await book_repository.getBookById(id);
    if(bookSelected.rowCount == 0) {
        err = {message:`No book with id ${id} found.`, status: 404};
        throw err;
    }
}

exports.validateBookUpdate = async (book, id) => {
    await this.validateBookId(id);
    if (!book) {
        err.message = "Book data is missing.";
        throw err;
    }
    else if(!book.name && !book.isbn && !book.author && !book.publishing_company && !book.year) {
        err.message = "Book must have isbn, name, author, publishing company or year fields.";
        throw err;
    }
}

validateBookIsbn = (isbn) => {
    if(!isbn){
        err.message = "Book doesn't have field isbn";
        throw err;
    }
}

validateBookName = (name) => {
    if(!name){
        err.message = "Book doesn't have field name";
        throw err;
    }
}

validateBookAuthor = (author) => {
    if(!author){
        err.message = "Book doesn't have field author";
        throw err;
    }
}

validateBookPublishingCompany = (publishing_company) => {
    if(!publishing_company){
        err.message = "Book doesn't have field publishing company";
        throw err;
    }
}

validateBookYear = (year) => {
    if(!year){
        err.message = "Book doesn't have field year";
        throw err;
    }
}

validateBook = (book) => {
    validateBookIsbn(book.isbn)
    validateBookName(book.name)
    validateBookAuthor(book.author)
    validateBookPublishingCompany(book.publishing_company)
    validateBookYear(book.year)
}