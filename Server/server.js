const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://root:123@catering.0rl1tgq.mongodb.net/Caterer')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: String,
  city: String
});
const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  price: Number,
  category: String,
  availability: [String],
  allergen: [String],
  ingredients: [String],
  substitute: [String]
});
const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'firstname lastname email');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

app.get('/products/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const products = await Product.find({ user: userId }).populate('user', 'firstname lastname email');
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this user' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products for user' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { userId, ...productData } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid user ID:', userId);
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const newProduct = new Product({
      ...productData,
      user: new mongoose.Types.ObjectId(userId),
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch (error) {
    console.log('Error adding product:', error.message);
    res.status(400).json({ error: error.message });
  }
});

  

app.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the number of rounds
      const newUser = new User({
        ...req.body,
        password: hashedPassword
      });
      await newUser.save();
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
    if (error.message.includes('ENOTFOUND') || error.message.includes('EAI_AGAIN')) {
      res.status(503).json({ error: 'No internet connection or the server is not reachable' });
    } else if (error.code === 11000) {
      res.status(400).json({ error: 'The user with this email already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          'secret', 
          { expiresIn: '1h' }
        );
        res.json({
          message: 'Login successful',
          token,
          user: {
            _id: user._id, 
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          }
        });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error during login' });
    }
  });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
