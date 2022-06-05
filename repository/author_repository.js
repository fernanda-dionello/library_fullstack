const {pool} = require('../config/connection_database');

exports.getAuthors = async() => {
    const bd = await pool.connect();
    try{
        return await bd.query('SELECT * FROM authors ORDER BY id');
    } catch(err) {
        throw err;
    };
};

exports.getAuthorById = async(id) => {
    const bd = await pool.connect();
    const values = [id];
    try{
        return await bd.query('SELECT * FROM authors WHERE id=$1', values);
    } catch(err) {
        throw err;
    };
}