const db = require('../config/db_config');

async function getAll(){
    let sql = `SELECT name FROM categories`;
    let [rows] = await db.query(sql);    
    return rows;
}


module.exports ={
    getAll,
}