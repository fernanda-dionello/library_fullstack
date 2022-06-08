exports.validateCountry = country => {
    if(country.rowCount == 0){
        err = {message:"No country found.", status: 404};
        throw err;
    }
}