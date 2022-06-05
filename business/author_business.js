const author_repository = require('../repository/author_repository');
const author_validator = require('./validators/author_validators');

exports.listAllAuthors = async () => {
    try{
        const authors = await author_repository.getAuthors();
        author_validator.validateAuthors(authors);
        return authors.rows;

    } catch (err) {
        throw err;
    };
};