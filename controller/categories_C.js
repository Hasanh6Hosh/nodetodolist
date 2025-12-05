const {getAll} = require('../model/categories_M.js');

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



module.exports={
    getAllCategories,
}