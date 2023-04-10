import './header.scss';
import { Link } from 'react-router-dom';

export function Header({ title, value, context, isLink = true, isDelete = true, handleSubmit, handleDelete }) {

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
                            <button onClick={handleDelete}>{context}</button>
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