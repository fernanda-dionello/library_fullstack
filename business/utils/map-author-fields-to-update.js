const author_repository = require('../../repository/author_repository');

exports.mapAuthorFieldsToUpdate = async (author, id) => {
    const authorDb = await author_repository.getAuthorById(id);

    return {
        name: author.name || authorDb.rows[0].name,
        country: author.country || authorDb.rows[0].country
    }
}