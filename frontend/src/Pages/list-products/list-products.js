import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import './list-products.scss';
import axios from 'axios';

export function ListProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteProductError, setDeleteProductError] = useState(null);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/listProducts`);
        const productsWithCheckboxState = response.data.reduce((acc, product) => {
          acc[product.id] = false; 
          return acc;
        }, {});
        setProducts(response.data);
        setSelectedProducts(productsWithCheckboxState);
        setIsLoading(false);
      } catch (error) {
        setErrorLoading('error loading product list');
        setIsLoading(false);
      }
    }
    fetchData();
  }, [deleteSuccess]);

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
      const checkedProducts = Object.entries(selectedProducts).filter(([id, isChecked]) => isChecked);
      if (checkedProducts.length === 0) {
        return;
      }
      const deleteRequests = checkedProducts.map(([id]) => axios.delete(`https://scandiwebtestdevjr.herokuapp.com/deleteProduct/${id}`));
      await Promise.all(deleteRequests);
      setDeleteSuccess(true);
    } catch (error) {
      setDeleteProductError("Error deleting id");
    }
  }
  return (
    <>
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
    </>
  )
}