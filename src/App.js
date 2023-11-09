import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './routes/home/home_component';
import './App.css';
import About from './routes/about/about_component';
import Product from './routes/product/product_component';
import Products from './routes/products/products_component';
import Contact from './routes/contact/contact_component';
import Cart from './routes/cart/cart_component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
