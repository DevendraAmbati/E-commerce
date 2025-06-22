import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<FaStar key={i} color={i <= rating ? '#ffc107' : '#e4e5e9'} />);
    }
    return stars;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='container'> 
    <h1>All Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...settings}>
          {products.map(product => (
            <div key={product.id}>
               <Link variant="primary" to={`/product/${product.id}`} style={{textDecoration:"none"}}>
              <Card style={{ width: '18rem', padding: '10px', margin: '5px' }}>
                <Card.Img variant="top" src={product.thumbnail} height="200px" />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <p>Price: ${product.price}</p>
                    <p>Discount: {product.discountPercentage}%</p>
                    <p>Rating: {renderStarIcons(product.rating)}</p>
                    <p>Stock: {product.stock}</p>
                    <p>Brand: {product.brand}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductList;
