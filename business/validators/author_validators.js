let err = {message:"", status:400};

exports.validateAuthors = (authors, id) => {
    if(authors.rowCount == 0 && !id){
        err = {message:"No authors found.", status: 404};
        throw err;
    }

    if(authors.rowCount == 0 && id){
        err = {message:`No author with id ${id} found.`, status: 404};
        throw err;
    }

    authors.rows
    ? authors.rows.forEach(author => {
        validateAuthor(author, id)
    }) 
    : authors.forEach(author => {
        validateAuthor(author, id)
    });
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

validateAuthor = (author, id) => {
    validateAuthorName(author.name, id)
    validateAuthorCountry(author.country, id)
}