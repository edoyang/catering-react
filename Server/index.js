const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const connectDB = require('./Config/db');
const cloudinaryConfig = require('./Config/cloudinary');

require('dotenv').config();

const app = express();

connectDB();
cloudinaryConfig();

app.use(cors());
app.use(express.json());

app.use('/', userRoutes);
app.use('/', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
