const express = require('express');
const router = express.Router();
const {getAllCategories} = require('../controller/categories_C');
// const {} = require('../middelware/categories_MID');
const {isLoggedIn} = require('../middelware/auth_MID');

router.get('/',isLoggedIn,getAllCategories);
// router.get('/:id',isValidId,getOneUser);
// router.delete('/:id',isValidId,deleteUser);
// router.patch('/:id',isValidId,valuesToEdit,updateUser);

module.exports = router;