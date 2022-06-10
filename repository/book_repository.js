const {pool} = require('../config/connection_database');

exports.getAvailableBooks = async() => {
    const bd = await pool.connect();
    try{
        return await bd.query(`SELECT DISTINCT(books.id), books.isbn, books.name, authors.name as "author", publishing_companies.name as "publishing_company", books.year
        FROM books, authors, publishing_companies, rents
        WHERE books.author = authors.id
        AND  books.publishing_company = publishing_companies.id
        AND books.id != ALL(
        select book_id from rents where active = true) 
        ORDER BY books.id`);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
};

exports.getBooks = async() => {
    const bd = await pool.connect();
    try{
        return await bd.query(`
        SELECT books.id, books.isbn, books.name, authors.name as "author", publishing_companies.name as "publishing_company", books.year
        FROM books, authors, publishing_companies
        WHERE books.author = authors.id
        AND  books.publishing_company = publishing_companies.id
        ORDER BY books.id`);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
};

exports.getBookById = async(id) => {
    const bd = await pool.connect();
    const values = [id];
    try{
        return await bd.query(`
        SELECT books.id, books.isbn, books.name, authors.name as "author", publishing_companies.name as "publishing_company", books.year
        FROM books, authors, publishing_companies
        WHERE books.author = authors.id
        AND books.id = $1
        AND books.publishing_company = publishing_companies.id`, values);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.getBookByAuthorId = async(id) => {
    const bd = await pool.connect();
    const values = [id];
    try{
        return await bd.query(`SELECT books.id, books.isbn, books.name, authors.name as "author", publishing_companies.name as "publishing_company", books.year
        FROM books, authors, publishing_companies
        WHERE books.author = authors.id
        AND books.author = $1
        AND books.publishing_company = publishing_companies.id`, values);
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.postBooks = async(books) => {
    const bd = await pool.connect();
    try{
        await bd.query('BEGIN');
        const sql = "INSERT INTO books(isbn, name, author, publishing_company, year) VALUES ($1, $2, $3, $4, $5) RETURNING *";

        for(const book of books){
            const values = [book.isbn, book.name.toUpperCase(), book.author, book.publishing_company, book.year];
            await bd.query(sql, values);
        }
        await bd.query('COMMIT');
        console.log('COMMIT');
    }
    catch(err){
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code == 23505){
            err = {message:"Cannot create duplicate book with the same ISBN.", status: 403};
        }
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.updateBook = async(book, id) => {
    const bd = await pool.connect();
    const values = [book.isbn, book.name.toUpperCase(), book.author, book.publishing_company, book.year, id];
    try{
        await bd.query('BEGIN');
        const sql = "UPDATE books SET isbn=$1, name=$2, author=$3, publishing_company=$4, year=$5 WHERE id=$6 RETURNING *";
        await bd.query(sql, values);

        await bd.query('COMMIT');
        console.log('COMMIT');
    }
    catch(err){
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code = 23505){
            err = {message:"Cannot update to a book that already exists in books table.", status: 403};
        }
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.deleteBook = async(id) => {
    const bd = await pool.connect();
    const values = [id];
    try{
        await bd.query('BEGIN');
        const sql = 'DELETE FROM books WHERE id=$1 RETURNING *';

        await bd.query(sql, values);

        await bd.query('COMMIT');
        console.log('COMMIT');

    }
    catch(err) {
        await bd.query('ROLLBACK');
        console.log('ROLLBACK');
        if(err.code = 23503){
            err = {message:"Cannot delete book, because this book has a vinculation to rents table.", status: 403};
        };
        throw err;
    }
    finally{
        bd.release();
    };
}

exports.getBookIdByName = async bookName => {
    const bd = await pool.connect();
    const values = [bookName];
    try{
        const result = await bd.query('SELECT id FROM books WHERE name = $1', values);
        return result;
    }
    catch(err) {
        throw err;
    }
    finally{
        bd.release();
    };   
}
