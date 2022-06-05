
let err = {message:"", status:400};

exports.validateAuthors = authors => {
    if(authors.rowCount == 0){
        err = {message:"No authors found.", status: 404};
        throw err;
    }
};