const author_business = require('../business/author_business');

exports.listAuthors = async (req, resp) => {
    try{
        const res = await author_business.listAllAuthors();
        resp.json(res);
    } catch (e) {
        resp.status(e.status).json(e.message);
    };
};