const author_business = require('../business/author_business');

exports.listAuthors = async (req, resp) => {
    try{
        const res = await author_business.listAllAuthors();
        resp.json(res);
    } catch (e) {
        resp.status(e.status).json(e.message);
    };
};

exports.listAuthorById = async (req, resp) => {
    const id = req.params.id; 
    try{
        const res = await author_business.listAuthorById(id);
        resp.json(res);
    } catch (e) {
        resp.status(e.status).json(e.message);
    };
}