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

exports.postAuthors = async(authors) => {
    const bd = await pool.connect();
    try{
        await bd.query('BEGIN');
        const sql = "INSERT INTO authors (name, country) VALUES ($1, $2) RETURNING *";

        for(const author of authors){
            const values = [author.name.toUpperCase(), author.country];
            await bd.query(sql, values);
        }
        await bd.query('COMMIT');
        console.log('COMMIT');
    }
    catch(err){
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code == 23505){
            err = {message:"Cannot create duplicate author, it already exists in authors table.", status: 403};
        }
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.updateAuthor = async(author, id) => {
    const bd = await pool.connect();
    const values = [author.name.toUpperCase(), author.country, id];
    try{
        await bd.query('BEGIN');
        const sql = "UPDATE authors SET name=$1, country=$2 WHERE id=$3 RETURNING *";
        await bd.query(sql, values);

        await bd.query('COMMIT');
        console.log('COMMIT');
    }
    catch(err){
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code = 23505){
            err = {message:"Cannot update to an author that already exists in authors table.", status: 403};
        }
        throw err;
    }
    finally{
        bd.release();
    }

}

exports.deleteAuthor = async(id) => {
    const bd = await pool.connect();
    const values = [id];
    try{
        await bd.query('BEGIN');
        const sql = 'DELETE FROM authors WHERE id=$1 RETURNING *';

        await bd.query(sql, values);

        await bd.query('COMMIT');
        console.log('COMMIT');

    } catch(err) {
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code = 23503){
            err = {message:"Cannot delete author, because author has a vinculation to books table.", status: 403};
        };
        throw err;
    }
    finally{
        bd.release();
    };
}


