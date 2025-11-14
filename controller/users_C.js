const {getAll} = require('../model/users_M.js');

async function getAllUsers(req,res) {
    try{
        let users = await getAll();
        if(users.length == 0){
            return res.status(400).json({message:"אין נתונים"})
        }
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}
module.exports={
    getAllUsers,
}