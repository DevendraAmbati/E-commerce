import React from 'react';
import { useCart } from '../../CartContext';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Cart = () => {
  const { cartItems, incrementItem, decrementItem , removeItem } = useCart();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.stock * item.price, 0);
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Your Cart</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.thumbnail} alt={item.title} width="100" />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>
                      <Button variant="light" size="sm" onClick={() => decrementItem(item.id)}>
                        -
                      </Button>{' '}
                      {item.stock}{' '}
                      <Button variant="light" size="sm" onClick={() => incrementItem(item.id)}>
                        +
                      </Button>
                    </td>
                    <td>Rs. {item.price.toFixed(2)}</td>
                    <td>Rs. {(item.stock * item.price).toFixed(2)}</td>
                    <td>
                    <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Total: €{calculateTotalAmount().toFixed(2)}</h3>
          <Button variant="primary" className="text-right">
            Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
