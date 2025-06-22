import Container from 'react-bootstrap/Container';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { MdShoppingCart } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartContext';

function Navbars() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
        setSuggestions(response.data.products);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    // Fetch suggestions only if the query is not empty
    if (query.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      setResults(response.data.products);
      setLoading(false);

      // Navigate to ProductDetail page with the entered ID
      if (response.data.products.length > 0) {
        navigate(`/product/${query}`);
      }
    } catch (error) {
      console.error('Error searching:', error);
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Set the selected suggestion in the search bar
    setQuery(suggestion.title);
    // Trigger search with the selected suggestion
    handleSearch();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">E-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
        
            
          </Nav>
          <div>
        <div className='text-center ' > <input
          type="text"
          list="productSuggestions"
          placeholder="Enter search query"
          style={{border:"10px", borderBlockColor:"#ddd"}}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <datalist id="productSuggestions">
          {suggestions.map((suggestion) => (
            <option key={suggestion.id} value={suggestion.title} />
          ))}
        </datalist>
        <button onClick={handleSearch} style={{border:"10px", borderBlockColor:"#ddd"}}>Search</button></div>
       
        
      </div>
          <BootstrapNavbar bg="light" expand="lg">
      {/* Your Navbar content */}
      <Nav className="ml-auto">
        <Link to="/cart" className="nav-link">
        <MdShoppingCart style={{background:'#f2f2f2',padding:'5px', fontSize:'30px'}}/><sup style={{backgroundColor:'red',borderRadius:'60%', padding:'2px 5px 3px 5px', color:'white'}}>{cartItems.length}</sup> 
        </Link>
      </Nav>
    </BootstrapNavbar>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;