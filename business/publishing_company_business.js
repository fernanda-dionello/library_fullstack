const publishing_company_repository = require('../repository/publishing_company_repository');
const publishing_company_validators = require('./validators/publishing_company_validators');

exports.getPublishingCompanyIdByName = async (publishingCompanyName) => {
    try{
        const publishingCompany = publishingCompanyName.toUpperCase();
        const publishingCompanyId = await publishing_company_repository.getPublishingCompanyIdByName(publishingCompany);
        publishing_company_validators.validatePublishingCompany(publishingCompanyId, publishingCompanyName);
        return publishingCompanyId.rows[0].id;
    } catch (err) {
        throw err;
    };
}