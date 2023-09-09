const db = require('../models/index');

async function get_author_details(id){
    return await db.Author.findByPk(id, {
        attributes: {
            exclude: ['id', 'createdAt', 'updatedAt'],
        }
    });
}

module.exports = {
    get_author_details,
}