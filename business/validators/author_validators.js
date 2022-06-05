
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

};