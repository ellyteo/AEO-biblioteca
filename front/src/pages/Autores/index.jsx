import { useEffect, useState } from 'react'
import api from '../../api/api'
import '../Livros/style.css'
import './style.css'

// Valores iniciais dos campos do autor.
const formularioInicial = {
    nome: '',
    biografia: '',
    genero: '',
    livros: '',
}

function getRecords(response) {
    // Confere se a API retornou uma lista de autores.
    if (Array.isArray(response.data?.message)) {
        return response.data.message
    }

    throw new Error('Não foi possível carregar a lista de autores.')
}

function getErrorMessage(error, fallback) {
    // Usa a mensagem da API ou uma mensagem alternativa.
    return error.response?.data?.message || error.message || fallback
}

// Busca os autores e atualiza a tela ou a mensagem de erro.
async function carregarAutores(setAutores, setErro) {
    setErro('')

    try {
        const resposta = await api.get('/v1/autores/listar')
        setAutores(getRecords(resposta))
    } catch (error) {
        setErro(getErrorMessage(error, 'Não foi possível carregar os autores.'))
    }
}

function Autores() {
    // Guarda a lista, os campos do formulário e as mensagens.
    const [autores, setAutores] = useState([])
    const [formulario, setFormulario] = useState(formularioInicial)
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')

    // Atualiza o campo alterado no formulário.
    const atualizarCampo = (event) => {
        const { name, value } = event.target
        setFormulario((atual) => ({ ...atual, [name]: value }))
    }

    // Carrega a lista quando a página é aberta.
    useEffect(() => {
        carregarAutores(setAutores, setErro)
    }, [])

    // Envia o formulário, limpa os campos e atualiza a lista.
    const handleSubmit = async (event) => {
        event.preventDefault()
        setErro('')
        setSucesso('')

        try {
            await api.post('/v1/autores/criar', formulario)

            setFormulario(formularioInicial)
            setSucesso('Autor cadastrado com sucesso.')
            carregarAutores(setAutores, setErro)
        } catch (error) {
            setErro(getErrorMessage(error, 'Não foi possível cadastrar o autor.'))
        }
    }

    return (
        <main className="livros-page">
            <section className="livros-form-section">
                {/* Formulário para cadastrar um autor. */}
                <form className="livros-form" onSubmit={handleSubmit}>
                    <h1>Cadastro de autores</h1>
                    <p className="livros-subtitle">Preencha os dados para adicionar um autor.</p>

                    {erro && <p className="livros-feedback livros-error" role="alert">{erro}</p>}
                    {sucesso && <p className="livros-feedback livros-success" role="status">{sucesso}</p>}

                    <div className="livros-input-group">
                        <label htmlFor="autor-nome">Nome do autor:</label>
                        <input
                            id="autor-nome"
                            name="nome"
                            type="text"
                            required
                            value={formulario.nome}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="autor-biografia">Biografia:</label>
                        <input
                            id="autor-biografia"
                            name="biografia"
                            type="text"
                            required
                            value={formulario.biografia}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="autor-genero">Gênero:</label>
                        <input
                            id="autor-genero"
                            name="genero"
                            type="text"
                            required
                            value={formulario.genero}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="autor-livros">Livros:</label>
                        <input
                            id="autor-livros"
                            name="livros"
                            type="text"
                            required
                            value={formulario.livros}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <button className="livros-submit" type="submit">Cadastrar autor</button>
                </form>
            </section>

            {/* Lista os autores cadastrados e permite atualizá-la. */}
            <section className="livros-list-section">
                <div className="livros-list-heading">
                    <div>
                        <h2>Autores cadastrados</h2>
                        <p>{autores.length} {autores.length === 1 ? 'autor' : 'autores'}</p>
                    </div>
                    <button
                        className="livros-refresh"
                        type="button"
                        onClick={() => carregarAutores(setAutores, setErro)}
                    >
                        Atualizar lista
                    </button>
                </div>

                {autores.length === 0 ? (
                    <p className="livros-empty">Ainda não há autores cadastrados.</p>
                ) : (
                    <ul className="livros-list">
                        {autores.map((autor, index) => (
                            <li className="livros-list-item" key={autor.id ?? index}>
                                <div>
                                    <strong>{autor.nome}</strong>
                                    <span>{autor.biografia}</span>
                                </div>
                                <div className="livros-details">
                                    <span>{autor.genero}</span>
                                    <span>{autor.livros}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default Autores
