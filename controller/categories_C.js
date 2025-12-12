const {getAll,add,getOne} = require('../model/categories_M.js');

async function getAllCategories(req,res) {
    try{
        let categories = await getAll();
        if(categories.length == 0){
            return res.status(400).json({message:"אין נתונים"})
        }
        res.status(200).json(categories)
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}

async function addCategory(req,res) {
    try{
        let name = req.body.name;
        let userId = req.user.id;

        let categoryId = await add({name,userId});
        if(!categoryId){
            return res.status(500).json({message:"Server error"});
        }
        res.status(201).json({message:"נוסף בהצלחה"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

async function getCategory(req,res) {
    try{
        let category = await getOne(req.id,req.user.id);
        if(!category){
            return res.status(400).json({message:`category is not found!`})
        }
        res.status(200).json(category);
    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}

module.exports={
    getAllCategories,
    addCategory,
    getCategory
}