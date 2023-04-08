import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import './list-products.scss';

export function ListProducts() {

    const products = [
        { sku: '001', name: 'Product 1', price: 10.0, size: 'M' },
        { sku: '002', name: 'Product 2', price: 20.0, size: 'L' },
        { sku: '003', name: 'Product 3', price: 30.0, size: 'S' },
        { sku: '004', name: 'Product 4', price: 40.0, size: 'XL' },
       
      ];

      function listProducts() {
        return products.map((product, index) => (
          
          <div className="card" key={index}>
            <input type="checkbox" className="delete-checkbox" />
            <div className="box-info">
              <p>{product.sku}</p>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.size}</p>
            </div>
          </div>
        ));
      }

    return (
        <>
            <Header title="Product List" value="ADD" context="MASS DELETE" />
            <main>
                <div className="cards-wrapper">
                 
                  {listProducts()}
                 
                </div>
            </main>
            <Footer context="Scandiweb Test assignment"/>
        </>
    )
}