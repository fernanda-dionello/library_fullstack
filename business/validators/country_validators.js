const country_business = require('../country_business');

exports.validateCountry = country => {
    if(country.rowCount == 0){
        err = {message:"No country found.", status: 404};
        throw err;
    }
}

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