const author_repository = require('../repository/author_repository');
const author_validators = require('./validators/author_validators');
const country_validators = require('./validators/country_validators');

exports.listAllAuthors = async () => {
    try{
        const authors = await author_repository.getAuthors();
        await author_validators.validateAuthors(authors, '');
        return authors.rows;

    } catch (err) {
        throw err;
    };
};

exports.listAuthorById = async (id) => {
    try{
        const authors = await author_repository.getAuthorById(id);
        await author_validators.validateAuthors(authors, id);
        return authors.rows;
    } catch (err) {
        throw err;
    };
}

exports.insertAuthors = async (authors) => {
    try{
        await author_validators.validateAuthors(authors, '');
        await country_validators.mapCountryNameToCountryId(authors);
        return await author_repository.postAuthors(authors);
    } catch(err) {
        throw err;
    }
}

exports.removeAuthor = async (id) => {
    try{
        await author_validators.validateAuthors('', id);
        return await author_repository.deleteAuthor(id);
    } catch (err) {
        throw err;
    };
}