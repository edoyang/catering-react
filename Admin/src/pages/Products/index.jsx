import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visibleProductId, setVisibleProductId] = useState(null);  // State to track the visible product description

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }

      // Update the state to remove the product
      setProducts(currentProducts => currentProducts.filter(product => product._id !== id));
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  const toggleVisibility = (id) => {
    setVisibleProductId(visibleProductId === id ? null : id);
  };

  return (
    <div className='product-page'>
      <h1>Products</h1>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <div className="product-image" onClick={() => toggleVisibility(product._id)}>
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
                )}
                <p style={{ display: visibleProductId === product._id ? 'block' : 'none' }}>Description...</p>
              </div>
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <button onClick={() => deleteProduct(product._id)} style={{ display: 'block' }}>
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Products;
