import { useNavigate } from 'react-router-dom'
import './style.css'

function Header() {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header className="site-header">
            <button className="site-brand" type="button" onClick={() => navigate('/bibliotecario')}>
                Biblioteca AEO
            </button>
            <nav aria-label="Navegação principal">
                <button type="button" onClick={() => navigate('/bibliotecario')}>Painel</button>
                <button className="site-logout" type="button" onClick={handleLogout}>Sair</button>
            </nav>
        </header>
    )
}


export default Header