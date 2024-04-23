const mongoose = require('mongoose');
const Product = require('../Models/product');
const { capitalizeProductFields } = require('../Helpers/productHelpers');
const cloudinary = require('cloudinary').v2;


async function getAllProducts(req, res) {
  try {
    let products = await Product.find().populate('user', 'firstname lastname email');
    products = products.map(capitalizeProductFields);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products', details: error.message });
  }
}

const uploadImageToCloudinary = async (file) => {
  try {
      if (!file) {
          throw new Error("No file provided");
      }

      return {
          url: file.path,
          publicId: file.filename
      };
  } catch (error) {
      console.error("Failed to process image data:", error);
      throw new Error("Image processing failed");
  }
};

async function addProduct(req, res) {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'Image upload failed' });
      }

      const imageData = await uploadImageToCloudinary(req.file);

      const availability = Array.isArray(req.body.availability) ? req.body.availability : (req.body.availability || '').split(',');
      const allergen = Array.isArray(req.body.allergen) ? req.body.allergen : (req.body.allergen || '').split(',');
      const ingredients = Array.isArray(req.body.ingredients) ? req.body.ingredients : (req.body.ingredients || '').split(',');
      const substitute = Array.isArray(req.body.substitute) ? req.body.substitute : (req.body.substitute || '').split(',');

      const newProduct = new Product({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          imageUrl: imageData.url,
          publicId: imageData.publicId,
          category: req.body.category,
          availability,
          allergen,
          ingredients,
          substitute,
          user: req.body.userId
      });

      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

async function getProductsByCategory(req, res) {
  try {
    const category = req.params.category.toLowerCase();
    let products = await Product.find({ category }).populate('user', 'firstname lastname email');
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }
    products = products.map(capitalizeProductFields);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error fetching products for category ${req.params.category}: ${error.message}` });
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.id;

  try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      const cloudinaryResponse = await cloudinary.uploader.destroy(product.publicId);
      if (cloudinaryResponse.result !== 'ok') {
          console.log('Cloudinary deletion response:', cloudinaryResponse);
          return res.status(500).json({ message: 'Failed to delete image from Cloudinary' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}


module.exports = { getAllProducts, addProduct, getProductsByCategory, deleteProduct };