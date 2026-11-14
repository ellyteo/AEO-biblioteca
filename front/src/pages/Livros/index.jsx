import { useEffect, useState } from 'react'
import api from '../../api/api'
import './style.css'

const formularioInicial = {
    nome: '',
    idAutor: '',
    ano: '',
    editora: '',
}

function getRecords(response, label) {
    if (Array.isArray(response.data?.message)) {
        return response.data.message
    }

    throw new Error(`Não foi possível carregar a lista de ${label}.`)
}

function getErrorMessage(error, fallback) {
    return error.response?.data?.message || error.message || fallback
}

function Livros() {
    const [livros, setLivros] = useState([])
    const [autores, setAutores] = useState([])
    const [formulario, setFormulario] = useState(formularioInicial)
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [salvando, setSalvando] = useState(false)
    const [versaoLista, setVersaoLista] = useState(0)

    const atualizarCampo = (event) => {
        const { name, value } = event.target
        setFormulario((atual) => ({ ...atual, [name]: value }))
    }

    useEffect(() => {
        const carregarDados = async () => {
            setCarregando(true)
            setErro('')

            try {
                const [respostaLivros, respostaAutores] = await Promise.all([
                    api.get('/v1/livros/listar'),
                    api.get('/v1/autores/listar'),
                ])

                setLivros(getRecords(respostaLivros, 'livros'))
                setAutores(getRecords(respostaAutores, 'autores'))
            } catch (error) {
                setErro(getErrorMessage(error, 'Não foi possível carregar os dados.'))
            } finally {
                setCarregando(false)
            }
        }

        carregarDados()
    }, [versaoLista])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErro('')
        setSucesso('')
        setSalvando(true)

        try {
            await api.post('/v1/livros/criar', {
                ...formulario,
                ano: Number(formulario.ano),
            })

            setFormulario(formularioInicial)
            setSucesso('Livro cadastrado com sucesso.')
            setVersaoLista((atual) => atual + 1)
        } catch (error) {
            setErro(getErrorMessage(error, 'Não foi possível cadastrar o livro.'))
        } finally {
            setSalvando(false)
        }
    }

    const nomeAutor = (id) => {
        const autor = autores.find((item) => String(item.id) === String(id))
        return autor?.nome || 'Autor não encontrado'
    }

    return (
        <main className="livros-page">
            <section className="livros-form-section">
                <form className="livros-form" onSubmit={handleSubmit}>
                    <h1>Cadastro de livros</h1>
                    <p className="livros-subtitle">Preencha os dados para adicionar um livro.</p>

                    {erro && <p className="livros-feedback livros-error" role="alert">{erro}</p>}
                    {sucesso && <p className="livros-feedback livros-success" role="status">{sucesso}</p>}

                    <div className="livros-input-group">
                        <label htmlFor="livro-nome">Título do livro:</label>
                        <input
                            id="livro-nome"
                            name="nome"
                            type="text"
                            required
                            value={formulario.nome}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="livro-autor">Autor:</label>
                        <select
                            id="livro-autor"
                            name="idAutor"
                            required
                            value={formulario.idAutor}
                            onChange={atualizarCampo}
                            disabled={carregando || autores.length === 0}
                        >
                            <option value="" disabled>
                                {carregando ? 'Carregando autores...' : 'Selecione um autor'}
                            </option>
                            {autores.map((autor) => (
                                <option key={autor.id} value={autor.id}>{autor.nome}</option>
                            ))}
                        </select>
                        {!carregando && autores.length === 0 && (
                            <small className="livros-hint">Cadastre um autor antes de cadastrar um livro.</small>
                        )}
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="livro-ano">Ano de publicação:</label>
                        <input
                            id="livro-ano"
                            name="ano"
                            type="number"
                            min="1"
                            required
                            value={formulario.ano}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="livro-editora">Editora:</label>
                        <input
                            id="livro-editora"
                            name="editora"
                            type="text"
                            required
                            value={formulario.editora}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <button
                        className="livros-submit"
                        type="submit"
                        disabled={salvando || carregando || autores.length === 0}
                    >
                        {salvando ? 'Cadastrando...' : 'Cadastrar livro'}
                    </button>
                </form>
            </section>

            <section className="livros-list-section">
                <div className="livros-list-heading">
                    <div>
                        <h2>Livros cadastrados</h2>
                        {!carregando && <p>{livros.length} {livros.length === 1 ? 'livro' : 'livros'}</p>}
                    </div>
                    <button
                        className="livros-refresh"
                        type="button"
                        onClick={() => setVersaoLista((atual) => atual + 1)}
                        disabled={carregando}
                    >
                        {carregando ? 'Atualizando...' : 'Atualizar lista'}
                    </button>
                </div>

                {carregando ? (
                    <p className="livros-empty">Carregando livros...</p>
                ) : livros.length === 0 ? (
                    <p className="livros-empty">Ainda não há livros cadastrados.</p>
                ) : (
                    <ul className="livros-list">
                        {livros.map((livro, index) => (
                            <li className="livros-list-item" key={livro.id ?? index}>
                                <div>
                                    <strong>{livro.nome}</strong>
                                    <span>{nomeAutor(livro.idAutor)}</span>
                                </div>
                                <div className="livros-details">
                                    <span>{livro.ano}</span>
                                    <span>{livro.editora}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default Livros
