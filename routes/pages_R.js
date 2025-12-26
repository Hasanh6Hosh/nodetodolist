const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req,res)=>{res.sendFile(path.join(__dirname,"..","public","pages","index.html"))})
router.get('/reg',(req,res)=>{res.sendFile(path.join(__dirname,"..","public","pages","reg.html"))})

module.exports = router;