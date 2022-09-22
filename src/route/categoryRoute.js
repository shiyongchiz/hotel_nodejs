const express = require('express');
const categoryController = require('../controller/categoryController');

const router = express.Router();
router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/search', categoryController.getByName);
router.get('/:categoryId', categoryController.getOne);
router.put('/:categoryId', categoryController.update);

module.exports = router;
