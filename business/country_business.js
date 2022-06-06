const country_repository = require('../repository/country_repository');
const country_validators = require('./validators/country_validators');

exports.getCountryIdByName = async (countryName) => {
    try{
        const country = countryName.toUpperCase();
        const countryId = await country_repository.getCountryIdByName(country);
        country_validators.validateCountry(countryId);
        return countryId.rows[0].id;
    } catch (err) {
        throw err;
    };
}