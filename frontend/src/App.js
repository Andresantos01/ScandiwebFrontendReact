import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListProducts } from './Pages/list-products/list-products';
import { AddProduct } from './Pages/add-products/add-products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListProducts />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
