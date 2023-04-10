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
                            <Link to="/addproduct">
                            <button>
                                {value}
                            </button>
                            </Link>
                        ) : (
                            <button onClick={handleSubmit} >{value}</button>
                        )}
                        {isDelete ? (
                            <button onClick={handleDelete}>{context}</button>
                        ) : (
                            <Link to="/">
                            <button>
                               {context}
                            </button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}