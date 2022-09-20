const express = require('express');
const controller = require('../controller/categoryController');

const router = express.Router();
router.post('/create', controller.create);
router.get('/get-all', controller.getAll);
router.get('/get-one/:categoryId', controller.getOne);
router.put('/update/:categoryId', controller.update);

module.exports = router;
