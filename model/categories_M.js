const db = require('../config/db_config');

async function getAll(){
    let sql = `SELECT * FROM categories`;
    let [rows] = await db.query(sql);    
    return rows;
}

async function add({name,userId}){
    let sql = `INSERT INTO categories (name,user_id) VALUES (?,?)`;
    let [result] = await db.query(sql,[name,userId]); 
    return result.insertId;
}

async function getOne(catId,userId){
    let sql = `SELECT * FROM categories WHERE id = ? AND user_id = ?`;
    let [result] = await db.query(sql,[catId,userId]);    
    return result[0];
}

module.exports ={
    getAll,
    add,
    getOne
}