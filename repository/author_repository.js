const {pool} = require('../config/connection_database');

exports.getAuthors = async() => {
    const bd = await pool.connect();
    try{
        return await bd.query('SELECT * FROM authors ORDER BY id');
    } catch(err) {
        throw err;
    };
};