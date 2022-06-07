const author_repository = require('../../repository/author_repository');

let err = {message:"", status:400};

exports.validateAuthors = async (authors, id) => {

    if(authors.rowCount == 0 && !id){
        err = {message:"No authors found.", status: 404};
        throw err;
    }

    if(authors.rowCount == 0 && id){
        err = {message:`No author with id ${id} found.`, status: 404};
        throw err;
    }
    await validateAuthorId(authors, id);

    if (authors.rows) {
        for(const author of authors.rows) {
            validateAuthor(author, id)
        }
    }
    else {
        for(const author of authors) {
            validateAuthor(author, id)
        }
    };
};

validateAuthorName = (name, id) => {
    if(!name && !id){
        err.message = "Author doesn't have field name";
        throw err;
    }
}

validateAuthorCountry = (country, id) => {
    if(!country && !id){
        err.message = "Author doesn't have field country";
        throw err;
    }
}

validateAuthorId = async (author, id) => {
    if(!author && id){
        const authorSelected = await author_repository.getAuthorById(id);
        if(authorSelected.rowCount == 0) {
            err = {message:`No author with id ${id} found.`, status: 404};
            throw err;
        }
    }
}

validateAuthor = (author, id) => {
    validateAuthorName(author.name, id)
    validateAuthorCountry(author.country, id)
}