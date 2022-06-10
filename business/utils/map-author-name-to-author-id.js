const author_business = require('../../business/author_business');

exports.mapAuthorNameToAuthorId = async (books) => {
    for(const book of books){
        if(book.author){
            const authorId = await author_business.getAuthorIdByName(book.author);
            if(!authorId) {
                err = {message:"Author not found.", status: 404};
                throw err;
            }
            book.author = authorId;
        };
    };
};
