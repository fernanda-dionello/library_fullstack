const publishing_company_business = require('../../business/publishing_company_business');

exports.mapPublishingCompanyNameToPublishingCompanyId = async (books) => {
    for(const book of books){
        if(book.publishing_company){
            const publishingCompanyId = await publishing_company_business.getPublishingCompanyIdByName(book.publishing_company);
            if(!publishingCompanyId) {
                err = {message:"Publishing company not found.", status: 404};
                throw err;
            }
            book.publishing_company = publishingCompanyId;
        };
    };
};
