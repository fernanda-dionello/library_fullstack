const author_repository = require('../repository/author_repository');
const author_validators = require('./validators/author_validators');

const { mapCountryNameToCountryId } = require('../business/utils/map-country-name-to-country-id');
const { mapAuthorFieldsToUpdate } = require('../business/utils/map-author-fields-to-update');

exports.listAllAuthors = async () => {
    try{
        const authors = await author_repository.getAuthors();
        author_validators.validateAuthorsFounded(authors);
        return authors.rows;

    } catch (err) {
        throw err;
    };
};

exports.listAuthorById = async (id) => {
    try{
        const authors = await author_repository.getAuthorById(id);
        author_validators.validateAuthorFounded(authors, id);
        return authors.rows;
    } catch (err) {
        throw err;
    };
}

exports.insertAuthors = async (authors) => {
    try{
        author_validators.validateAuthorsCreation(authors);
        await mapCountryNameToCountryId(authors);
        return await author_repository.postAuthors(authors);
    } catch(err) {
        throw err;
    }
}

exports.updateAuthor = async (id, author) => {
    try{
        await author_validators.validateAuthorUpdate(author, id);
        await mapCountryNameToCountryId([author]);
        const mappedAuthor = await mapAuthorFieldsToUpdate(author);
        return await author_repository.updateAuthor(mappedAuthor, id);
    } catch(err) {
        throw err;
    }
}

exports.removeAuthor = async (id) => {
    try{
        await author_validators.validateAuthorId(id);
        return await author_repository.deleteAuthor(id);
    } catch (err) {
        throw err;
    };
}