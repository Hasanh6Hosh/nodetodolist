const db = require('../config/db_config');

async function getAll(){
    let sql = `SELECT id,name,email FROM users`;
    let [rows] = await db.query(sql);    
    return rows;
}

module.exports ={
    getAll,
}