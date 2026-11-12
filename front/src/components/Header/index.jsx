import { Link, useNavigate } from 'react-router-dom'
import './style.css'

function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header className="site-header">
            <Link className="site-header__brand" to="/bibliotecario" aria-label="AEO Biblioteca - início">
                <span className="site-header__mark" aria-hidden="true">A</span>
                <span className="site-header__brand-copy">
                    <strong>AEO Biblioteca</strong>
                    <small>Conhecimento para todos</small>
                </span>
            </Link>

            <nav className="site-header__nav" aria-label="Navegação principal">
                <Link to="/bibliotecario">Início</Link>
                <Link to="/bibliotecario#livros">Livros</Link>
                <Link to="/bibliotecario#autores">Autores</Link>
            </nav>

            <button
                className="site-header__logout"
                type="button"
                onClick={handleLogout}
            >
                Sair
            </button>
        </header>
    )
}

export default Header
