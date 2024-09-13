const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const verifyToken = require('../middleware/verifiyToken');
const userRoles = require('../utils/userRoutes');

const router = express.Router();
const allowedTo = require('../middleware/allowedTo')


router.route('/')
    .get(getProducts)
    .post(verifyToken,
        createProduct)

router.route('/:id')
    .get(
        getProductById)
    .put(updateProduct)
    // .patch(updateProduct)
    .delete(
        verifyToken,
        allowedTo(userRoles.ADMIN, userRoles.MANAGER),
        deleteProduct)


module.exports = router;
