const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
// const verifyToken = require('../middleware/verifiyToken');
// const userRoles = require('../utils/userRoutes');

const router = express.Router();
// const allowedTo = require('../middleware/allowedTo')


// router.get('/', getProducts);
// router.post('/', createProduct);
router.route('/').get(
    // verifyToken,
    getProducts).post(
        // verifyToken,
        createProduct)
// router.get('/:id', getProductById);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

router.route('/:id')
    .get(
        // verifyToken,
        getProductById)
    .patch(updateProduct)
    .delete(
        // verifyToken,
        // allowedTo(userRoles.ADMIN, userRoles.MANGER),
        deleteProduct)


module.exports = router;
