import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './style.scss';
import Header from './components/Header/Header'; 
import Home from './pages/Home/Home'; 
import Cart from './pages/Cart/Cart';
import CategoryPage from './pages/CategoryPage/CategoryPage'; 
import Detail from './pages/Detail/Detail'; 
import { getCategories } from './redux/reducer'; 

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/product/:id' element={<Detail />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
