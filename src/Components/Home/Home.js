// Home.js
import React, { useState, useEffect } from 'react';
import Smartphon from "./Smartphon";
import Carousels from './Carousels';
import Cards from './Cards';
import Laptop from './Laptops';
import Groceries from './Groceries';
import Furniture from './Furniture';
import Skincare from './Skincare';
import Homedecoration from './Homedecoration';


const Home = () => {

  return (
    <>
      <Carousels />
     <Smartphon/>
     <Homedecoration/>
     <Groceries/>
     <Furniture/>
     <Skincare/>
     <Laptop/>
      <Cards />
    </>
  );
};

export default Home;
