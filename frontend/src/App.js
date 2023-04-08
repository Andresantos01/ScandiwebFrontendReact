import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ListProducts } from './Pages/ListProducts/list-products';
import { AddProduct } from './Pages/AddProducts/add-products';

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
