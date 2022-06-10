const {pool} = require('../config/connection_database');

exports.getCountryIdByName = async countryName => {
    const bd = await pool.connect();
    const values = [countryName];
    try{
        const result = await bd.query('SELECT id FROM countries WHERE country = $1', values);
        return result;
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };   
}