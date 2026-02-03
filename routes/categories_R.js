const express = require('express');
const router = express.Router();

const {isLoggedIn} = require('../middelware/auth_MID');

const {
  getAllCategories,
  addCategory,
  deleteCategory
} = require('../controller/categories_C');

router.get('/', isLoggedIn, getAllCategories);
router.post('/', isLoggedIn, addCategory);
router.delete('/:id', isLoggedIn, deleteCategory);

module.exports = router;