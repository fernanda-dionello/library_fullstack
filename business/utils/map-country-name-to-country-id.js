const country_business = require('../../business/country_business');

exports.mapCountryNameToCountryId = async (authors) => {
    for(const author of authors){
        const countryId = await country_business.getCountryIdByName(author.country);
        if(!countryId) {
            err = {message:"Country not found.", status: 404};
            throw err;
        }
        author.country = countryId;
    }
};
