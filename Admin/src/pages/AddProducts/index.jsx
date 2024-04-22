import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/Authcontext';

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    availability: '',
    allergen: '',
    ingredients: '',
    substitute: '',
    image: null 
  });
  

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: Number(value)
      }));
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to add products.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', product.name.toLowerCase());
    formData.append('price', product.price);
    formData.append('category', product.category.toLowerCase());
    product.availability.split(',').forEach(day => {
      formData.append('availability', day.trim().toLowerCase());
    });
    product.allergen.split(',').forEach(allergen => {
      formData.append('allergen', allergen.trim().toLowerCase());
    });
    product.ingredients.split(',').forEach(ingredient => {
      formData.append('ingredients', ingredient.trim().toLowerCase());
    });
    product.substitute.split(',').forEach(substitute => {
      formData.append('substitute', substitute.trim().toLowerCase());
    });
    formData.append('userId', user._id);
    if (product.image) {
      formData.append('image', product.image);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    try {
      const response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        body: formData  // No Content-Type header needed, browser will set it with proper boundary
      });
      if (response.ok) {
        alert('Product added successfully!');
        setProduct({
          name: '',
          price: '',
          category: '',
          availability: '',
          allergen: '',
          ingredients: '',
          substitute: '',
          image: null
        });
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };  

  const handleFileChange = (e) => {
    console.log(e.target.files); 
    setProduct(prevProduct => ({
      ...prevProduct,
      image: e.target.files[0] 
    }));
  };

  useEffect(() => {
    console.log(product.image);
  }, [product.image]);
  

  return (
    <div className='add-product-page'>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="image">Product Image</label>
          <div className="form-input">
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">Product name</label>
          <div className="form-input">
            <img src="" alt="" />
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder='Product name'
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="price">Product Price</label>
          <div className="form-input">
            <img src="" alt="" />
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder='price'
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <div className="form-input">
            <img src="" alt="" />
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder='Category'
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <div className="form-input">
            <img src="" alt="" />
            <input
              type="text"
              id="availability"
              name="availability"
              value={product.availability}
              onChange={handleChange}
              placeholder='Availaibility'
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="allergen">Allergens (comma separated, e.g. Nuts, Dairy)</label>
          <div className="form-input">
            <img src="" alt="" />
            <input
              type="text"
              id="allergen"
              name="allergen"
              value={product.allergen}
              onChange={handleChange}
              placeholder='Allergens'
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (comma separated, e.g. Flour, Eggs)</label>
          <div className="form-input">
            <img src="" alt="" />
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              value={product.ingredients}
              onChange={handleChange}
              placeholder='Ingredients'
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="substitute">Substitutes (comma separated, e.g. Almond milk, Gluten free flour)</label>
          <div className="form-input">
            <img src="" alt="" />
            <input
              type="text"
              id="substitute"
              name="substitute"
              value={product.substitute}
              onChange={handleChange}
              placeholder='Substitutes'
            />
          </div>
        </div>

        <button type="submit">Add Product</button>
      </form>

    </div>
  );
};

export default AddProducts;