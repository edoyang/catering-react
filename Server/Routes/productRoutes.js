const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { getAllProducts, addProduct, getProductsByCategory, deleteProduct } = require('../Controllers/productController');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product_images',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

const parser = multer({ storage: storage });

// Setup routes
router.get('/products', getAllProducts);
router.post('/products', parser.single('image'), addProduct);
router.get('/products/category/:category', getProductsByCategory);
router.delete('/products/delete/:id', deleteProduct); // Make sure this is correctly referencing the exported function

module.exports = router;
