// src/ProductDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();

  // Fetch product details based on the ID and display them

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product ID: {id}</p>
      {/* ... fetch and display product details */}
      <Link to="/search">Go back to Search Page</Link>
    </div>
  );
};

export default ProductDetail;
