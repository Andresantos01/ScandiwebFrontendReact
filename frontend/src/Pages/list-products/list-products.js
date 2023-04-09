import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import './list-products.scss';
import axios from 'axios';

export function ListProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errorLoading, setErrorLoading] = useState("");
  const [deleteProductError, setDeleteProductError] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/listProducts');
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        setErrorLoading('error loading product list');
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedProducts([...selectedProducts, value]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== value));
    }
  }

  function listProducts() {
    return products.map((product, index) => (
      <div className="card" key={index}>
        <input type="checkbox" value={product.id} className="delete-checkbox" onChange={handleCheckboxChange} />
        <div className="box-info">
          <p>{product.sku}</p>
          <p>{product.name}</p>
          <p>{product.price}</p>
          {product.size.includes("Kg") && (
            <p>Weight: {product.size}</p>
          )}
          {product.size.includes("MB") && (
            <p>Size: {product.size}</p>
          )}
          {product.size.includes("x") && (
            <p>Dimension: {product.size}</p>
          )}
        </div>
      </div>
    ));
  }

  
  
  async function handleDeleteMassCheckbox() {
    //console.log("Selected products:", selectedProducts);
    for (const id of selectedProducts) {
      try {
        await axios.delete(`http://localhost:8000/deleteProduct/${id}`, {
          headers: {
            'Content-Type': 'application/json'
        }
        });
        console.log(`Produto ${id} excluído com sucesso!`);
      } catch (error) {
        setDeleteProductError("Error deleting ids");
      }
    }
  }

  return (
    <>
      <Header title="Product List" value="ADD" context="MASS DELETE" handleDelete={handleDeleteMassCheckbox} />
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