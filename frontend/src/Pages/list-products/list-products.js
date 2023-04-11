import { useState, useEffect } from "react";
import { Header } from "../../components/header/header";
import './list-products.scss';
import { Footer } from "../../components/footer/footer";
import axios from 'axios';

export function ListProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteProductError, setDeleteProductError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://scandiwebtestdevjr.herokuapp.com/listProducts`);
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        setErrorLoading('error loading product list');
        setIsLoading(false);
      }
    }

    if (selectedProducts === null) {
      const initialState = products.reduce((acc, product) => {
        acc[product.id] = false;
        return acc;
      }, {});
      setSelectedProducts(initialState);
    } else if (deleteSuccess && !isDeleting) {
      fetchData();
      setDeleteSuccess(false);
    }
    
    fetchData();
  }, [deleteSuccess, isDeleting, selectedProducts]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedProducts({
      ...selectedProducts,
      [value]: checked 
    });
  }

  function listProducts() {
    const sizeTexts = {
      "Kg": "Weight",
      "MB": "Size",
      "x": "Dimension"
    };
  
    return products.map((product, index) => (
      <div className="card" key={index}>
        <input type="checkbox" value={product.id} className="delete-checkbox" onChange={handleCheckboxChange} checked={selectedProducts[product.id]} />
        <div className="box-info">
          <p>{product.sku}</p>
          <p>{product.name}</p>
          <p>{product.price} $</p>
          {product.size && (
            <p>{sizeTexts[product.size.match(/[a-zA-Z]+/)[0]]}: {product.size}</p>
          )}
        </div>
      </div>
    ));
  }

  async function handleDeleteMassCheckbox() {
    try {
      setIsDeleting(true);
      const checkedProducts = Object.entries(selectedProducts).filter(([id, isChecked]) => isChecked);
      if (checkedProducts.length === 0) {
        return;
      }
      const deleteRequests = checkedProducts.map(([id]) => axios.delete(`https://scandiwebtestdevjr.herokuapp.com/deleteProduct/${id}`));
      await Promise.all(deleteRequests);
      setTimeout(() => setDeleteSuccess(true), 1000);
    } catch (error) {
      setDeleteProductError("Error deleting id");
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <body>
      <Header title="Product List" value="ADD" context="MASS DELETE" handleDelete={handleDeleteMassCheckbox}  />
      <main>
        {
          deleteProductError && (
            <p>Error: {deleteProductError}</p>
          )}
        {errorLoading && (
          <p>Error: {errorLoading}</p>
        )}
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="cards-wrapper">{listProducts()}</div>
        )}
      </main>
      <Footer context="Scandiweb Test assignment" />
    </body>
  )
}