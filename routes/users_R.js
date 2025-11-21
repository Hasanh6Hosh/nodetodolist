const express = require('express');
const router = express.Router();
const {getAllUsers,getOneUser,deleteUser} = require('../controller/users_C.js');
const {isValidId} = require('../middelware/users_MID');

router.get('/',getAllUsers);
router.get('/:id',isValidId,getOneUser);
router.delete('/:id',isValidId,deleteUser);

module.exports = router;