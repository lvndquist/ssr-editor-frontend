import { Link } from 'react-router-dom';

export default function Header({ onLogout, isValid }) {
    return (
        <header>
            <h1><Link to={"/"} className='header-link'>SSR Editor</Link></h1>
            {isValid && (
                <Link className="logout-link" onClick={onLogout}> Logga ut</Link>
            )}
        </header>
    )
}
