const {pool} = require('../config/connection_database');

exports.getRents = async() => {
    const bd = await pool.connect();
    try{
        return await bd.query('SELECT * FROM rents ORDER BY id');
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
};