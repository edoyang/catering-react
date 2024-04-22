const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  name: String,
  price: Number,
  category: String,
  availability: [String], 
  allergen: [String],      
  ingredients: [String],   
  substitute: [String],    
  imageUrl: String,
  publicId: String,
});

module.exports = mongoose.model('Product', productSchema);
