const db = require('../config/db_config');

async function getAll(){
    let sql = `SELECT id,name,email FROM users`;
    let [rows] = await db.query(sql);    
    return rows;
}

async function getOne(id){
    let sql = `SELECT id,name,email FROM users WHERE id = ?`;
    let [result] = await db.query(sql,[id]);    
    return result[0];
}

async function remove(id){
    let sql = `DELETE FROM users WHERE id = ?`;
    let [result] = await db.query(sql,[id]);    
    return result.affectedRows;
}

module.exports ={
    getAll,
    getOne,
    remove
}