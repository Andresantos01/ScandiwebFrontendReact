import './header.scss';
import { Link } from 'react-router-dom';

export function Header({ title, value, context, isLink = true, isDelete = true, handleSubmit, handleDele }) {

    return (
        <>
            <header>
                <div className="center">
                    <h1>{title}</h1>
                    <div className="buttons-wrapper">
                        {isLink ? (
                            <button>
                                <Link to="/addproduct">{value}</Link>
                            </button>
                        ) : (
                            <button onClick={handleSubmit} >{value}</button>
                        )}
                        {isDelete ? (
                            <button id='delete-product-btn' onClick={handleDele}>{context}</button>
                        ) : (
                            <button>
                                <Link to="/">{context}</Link>
                            </button>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}