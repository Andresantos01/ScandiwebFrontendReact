import './header.scss';
import { Link } from 'react-router-dom';
export function Header({ title, value, context, isLink = true, isDelete = true }) {

    function handleProductFormSubmit() {
        return alert('Save product and redirect to product list');
    }

    function handleCancelProduct() {
        return alert('Cancel product, no save and redirect to product list');
    }

    function handleDeleteMassCheckbox() {
        return alert('delete mass checkbox');
    }

    return (
        <>
            <header>
                <div className="center">
                    <h1>{title}</h1>
                    <div className="buttons-wrapper">
                        {isLink ? (
                            <button>
                                <Link to="/addProduct">{value}</Link>
                            </button>
                        ) : (
                            <button onClick={handleProductFormSubmit}>{value}</button>
                        )}
                        {isDelete ? (
                            <button onClick={handleDeleteMassCheckbox}>{context}</button>
                        ) : (
                            <button onClick={handleCancelProduct}>{context}</button>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}