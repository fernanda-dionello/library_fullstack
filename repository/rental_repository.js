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

exports.getBookAvailability = async(book_id) => {
    const bd = await pool.connect();
    const values = [book_id]
    try{
        return await bd.query('SELECT count(*) FROM rents WHERE book_id = $1 AND active = true', values);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.getClientActiveBooks = async(client_registration_number) => {
    const bd = await pool.connect();
    const values = [client_registration_number];
    try{
        return await bd.query('SELECT count(*) FROM rents WHERE client_registration_number = $1 AND active = true', values);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
};

exports.borrow = async(rents) => {
    const bd = await pool.connect();
    try{
        await bd.query('BEGIN');
        const sql = `INSERT INTO rents (client_registration_number, book_id, active, start_date, end_date) VALUES ($1, $2, true, current_date, (current_date + INTERVAL '7 day'))`;

        for(const rental of rents){
            const values = [rental.client_registration_number, rental.book_id];
            await bd.query(sql, values);
        }
        await bd.query('COMMIT');
        console.log('COMMIT');
    }
    catch(err){
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.getRental = async(book_id, client_registration_number) => {
    const bd = await pool.connect();
    const values = [book_id, client_registration_number];
    try{
        return await bd.query('SELECT id, end_date FROM rents WHERE book_id = $1 AND client_registration_number = $2 AND active = true', values);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.return = async(rental_id) => {
    const bd = await pool.connect();
    const values = [rental_id];
    try{
        await bd.query('BEGIN');
        const sql = 'UPDATE rents SET active = false WHERE id = $1';
        await bd.query(sql, values);
        await bd.query('COMMIT');
        console.log('COMMIT');
    }
    catch(err){
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        throw err;
    }
    finally{
        bd.release();
    };
}