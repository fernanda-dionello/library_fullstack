const {pool} = require('../config/connection_database');

exports.getPublishingCompanyIdByName = async publishingCompanyName => {
    const bd = await pool.connect();
    const values = [publishingCompanyName];
    try{
        const result = await bd.query('SELECT id FROM publishing_companies WHERE name = $1', values);
        return result;
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };   
}