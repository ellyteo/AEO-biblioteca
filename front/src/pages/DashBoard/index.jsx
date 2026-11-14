import './style.css'


function DashBoard() {
    return (
        <main className="content-page">
            <h1>Painel da biblioteca</h1>
            <p>Escolha uma seção para acessar os cadastros da biblioteca.</p>

            <div className="dashboard-Buttons">                  
                <a href="/bibliotecario/livros" className="dashboard-Button">
                    <h2>Livros</h2>
                </a>
                <a href="/bibliotecario/autores" className="dashboard-Button">
                    <h2>Autores</h2>
                </a>
                <a href="/bibliotecario/categorias" className="dashboard-Button">
                    <h2>Categorias</h2>
                </a>
            </div>
        </main>
    )
}

export default DashBoard