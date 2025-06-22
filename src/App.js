import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import SingleProduct from './Components/Home/SingleProduct';
import ProductDetail from './Components/Home/ProductDetail';
import { CartProvider } from './CartContext';
import Cart from './Components/Cart/Cart';
import Breadcrumb from './Components/Breadcrumbs/Breadcrumb'
function App() {
  
  return (
   <>
   <CartProvider>
   <Navbar/>
   <Breadcrumb/>
   <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path="/product/:id" element={<SingleProduct/>} />
      <Route path="/product/:id/details" element={<ProductDetail/>} />
      <Route path="/cart" element={<Cart/>}/> 
   </Routes>
   </CartProvider>
   </>
  );
}

export default App;
