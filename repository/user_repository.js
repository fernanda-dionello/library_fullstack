const {pool} = require('../config/connection_database');

exports.findUsername = async(username) => {
    const bd = await pool.connect();
    const values = [username];
    try{
        return await bd.query('SELECT * FROM users WHERE username = $1', values);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
}
