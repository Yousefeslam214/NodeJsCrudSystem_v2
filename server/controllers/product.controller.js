const asyncWrapper = require('../middleware/asyncWrapper');
const Product = require('../models/product.model');
const appError = require('../utils/appError');
const hST = require('../utils/httpStatusText');



const getProducts = asyncWrapper(async (req, res, next) => {
  const query = req.query
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = ((page - 1) * limit);
  const products = await Product.find({})
    .select('-createdAt -updatedAt -__v')
    // .lean() // Exclude specified fields
    .limit(limit)
    .skip(skip);
  return res.status(200).json({
    status: hST.SUCCESS,
    data: { products }
  });
})

const getProductById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).select('-createdAt -updatedAt -__v').lean(); // Exclude specified fields
  if (!product) {
    const error = appError.create('Product not found', 404, hST.FAIL)
    return next(error);
  }
  return res.status(200).json({
    status: hST.SUCCESS,
    data: { product }
  });
})

const createProduct = asyncWrapper(async (req, res, next) => {
  const { price } = req.body;
  if (price <= 0) {
    const error = appError.create('Price must be greater than 0', 400, hST.FAIL);
    return next(error);
  }
  const product = new Product(req.body);
  await product.save();
  return res.status(201).json({
    status: hST.SUCCESS,
    data: { product }
  });
}
)
const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { price } = req.body;

  if (price !== undefined && price <= 0) {
    const error = appError.create('Price must be greater than 0', 400, hST.FAIL);
    return next(error);
  }

  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!product) {
    const error = appError.create('Product not found', 404, hST.FAIL);
    return next(error);
  }

  return res.status(200).json({
    status: hST.SUCCESS,
    data: { product }
  });
});

// Delete a product by ID
const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    const error = appError.create('Product not found', 404, hST.FAIL);
    return next(error);
  }

  return res.status(200).json({
    status: hST.SUCCESS,
    data: { message: 'Product deleted successfully' }
  });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
