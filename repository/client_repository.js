const {pool} = require('../config/connection_database');

exports.getClients = async() => {
    const bd = await pool.connect();
    try{
        return await bd.query('SELECT * FROM clients ORDER BY registration_number');
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
};

exports.getClientByRegistrationNumber = async(registration_number) => {
    const bd = await pool.connect();
    const values = [registration_number];
    try{
        return await bd.query('SELECT * FROM clients WHERE registration_number=$1', values);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.postClients = async(clients) => {
    const bd = await pool.connect();
    try{
        await bd.query('BEGIN');
        const sql = "INSERT INTO clients (name, cellphone) VALUES ($1, $2) RETURNING *";

        for(const client of clients){
            const values = [client.name.toUpperCase(), client.cellphone];
            await bd.query(sql, values);
        }
        await bd.query('COMMIT');
        console.log('COMMIT');
    }
    catch(err){
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code == 23505){
            err = {message:"Cannot create duplicate client, it already exists in clients table.", status: 403};
        }
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.updateClient = async(client, registration_number) => {
    const bd = await pool.connect();
    const values = [client.name.toUpperCase(), client.cellphone, registration_number];
    try{
        await bd.query('BEGIN');
        const sql = "UPDATE clients SET name=$1, cellphone=$2 WHERE registration_number=$3 RETURNING *";
        await bd.query(sql, values);

        await bd.query('COMMIT');
        console.log('COMMIT');
    }
    catch(err){
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code = 23505){
            err = {message:"Cannot update to an client that already exists in clients table.", status: 403};
        }
        throw err;
    }
    finally{
        bd.release();
    }

}

exports.deleteClient = async(registration_number) => {
    const bd = await pool.connect();
    const values = [registration_number];
    try{
        await bd.query('BEGIN');
        const sql = 'DELETE FROM clients WHERE registration_number=$1 RETURNING *';

        await bd.query(sql, values);

        await bd.query('COMMIT');
        console.log('COMMIT');

    } catch(err) {
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code = 23503){
            err = {message:"Cannot delete client, because the client has a vinculation to rents table.", status: 403};
        }
        throw err;
    }
    finally{
        bd.release();
    };
}
