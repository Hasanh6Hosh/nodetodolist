const bcrypt = require('bcrypt');
const {addUser,getByUserName,getByEmail} = require('../model/users_M');

async function register(req,res) {
    try{
        let name = req.body.name;
        let email = req.body.email;
        let userName = req.body.userName;
        let pass = req.pass;

        let user = await getByUserName(userName);
        if(user){
            return res.status(409).json({message:"שם משתמש קיים במערכת"});
        }
        user = await getByEmail(email);
        if(user){
            return res.status(409).json({message:"אימייל קיים במערכת"});
        }

        let userId = await addUser({name,email,userName,pass});
        if(!userId){
            return res.status(500).json({message:"Server error"});
        }
        res.status(201).json({message:"נוסף בהצלחה"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

async function login(req,res) {
    try{
        let user = await getByUserName(req.body.userName);
        if(!user){
            return res.status(400).json({message:"שם משתמש או סיסמה שגויים"});
        }
        let isMatch = await bcrypt.compare(req.body.pass,user.pass);
        if(!isMatch){
            return res.status(400).json({message:"שם משתמש או סיסמה שגויים"});
        }
        res.status(200).json({message:"התחברת בהצלחה"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

module.exports ={
    register,
    login
}