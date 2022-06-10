exports.validatePublishingCompany = (publishingCompanyId,  publishingCompanyName) => {
    if(publishingCompanyId.rowCount == 0){
        err = {message:`No publishing company ${publishingCompanyName} found.`, status: 404};
        throw err;
    }
}