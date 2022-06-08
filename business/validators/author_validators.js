const author_repository = require('../../repository/author_repository');

let err = {message:"", status:400};

exports.validateAuthorsFounded = (authors) => {
    if(authors.rowCount == 0){
        err = {message:"No authors found.", status: 404};
        throw err;
    }
}

exports.validateAuthorFounded = (authors, id) => {
    if(authors.rowCount == 0){
        err = {message:`No author with id ${id} found.`, status: 404};
        throw err;
    }
}

exports.validateAuthorsCreation = (authors) => {
    for(const author of authors) {
        validateAuthor(author);
    }
}

exports.validateAuthorId = async (id) => {
    const authorSelected = await author_repository.getAuthorById(id);
    if(authorSelected.rowCount == 0) {
        err = {message:`No author with id ${id} found.`, status: 404};
        throw err;
    }
}

exports.validateAuthorUpdate = async (author, id) => {
    await this.validateAuthorId(id);
    if (!author) {
        err.message = "Author data is missing.";
        throw err;
    }
    else if(!author.name && !author.country) {
        err.message = "Author must have either name or country fields.";
        throw err;
    }
}

validateAuthorName = (name) => {
    if(!name){
        err.message = "Author doesn't have field name";
        throw err;
    }
}

validateAuthorCountry = (country) => {
    if(!country){
        err.message = "Author doesn't have field country";
        throw err;
    }
}

validateAuthor = (author) => {
    validateAuthorName(author.name)
    validateAuthorCountry(author.country)
}