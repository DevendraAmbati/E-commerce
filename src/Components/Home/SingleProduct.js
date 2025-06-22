import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCart } from '../../CartContext';
import { FaStar } from 'react-icons/fa';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products`);
        const singleProduct = response.data.products.find((product) => product.id === parseInt(id, 10));

        if (singleProduct) {
          setProduct(singleProduct);
        } else {
          console.error('Product not found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const renderStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<FaStar key={i} color={i <= rating ? '#ffc107' : '#e4e5e9'} />);
    }
    return stars;
  };
  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <div>
          <Container>
            <Row>
              <Col md={6}>
                <img src={product.thumbnail} alt={product.title} />
              </Col>
              <Col md={6}>
                <h2>{product.title}</h2>
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <p>Price: ${product.price}</p>
                <p>{product.description}</p>
                <p>Discount: {product.discountPercentage}%</p>
                <p>Rating: {renderStarIcons(product.rating)}</p>
                <p>Stock: {product.stock}</p>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  ADD TO CART
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default SingleProduct;
