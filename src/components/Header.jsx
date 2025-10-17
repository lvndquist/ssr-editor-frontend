import { Link } from 'react-router-dom';

export default function Header({ onLogout, isValid, user }) {
    return (
        <header>
            <h1><Link to={"/"} className='header-link'>SSR Editor</Link></h1>
            {isValid && (
                <div className="user-control">
                    <p className="user">{user}</p>
                    <Link className="logout-link" onClick={onLogout}> Logga ut</Link>
                </div>
            )}
        </header>
    )
}
