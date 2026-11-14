import { useCallback, useEffect, useState } from 'react'
import api from '../../api/api'
import './style.css'

function getRecords(response, label) {
    if (Array.isArray(response.data?.message)) {
        return response.data.message
    }

    throw new Error(`Não foi possível carregar a lista de ${label}.`)
}

function Livros() {
    const [livros, setLivros] = useState([])
    const [autores, setAutores] = useState([])
    const [nome, setNome] = useState('')
    const [idAutor, setIdAutor] = useState('')
    const [ano, setAno] = useState('')
    const [editora, setEditora] = useState('')
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [salvando, setSalvando] = useState(false)

    const carregarDados = useCallback(async () => {
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
            setErro(
                error.response?.data?.message ||
                error.message ||
                'Não foi possível carregar os dados.',
            )
        } finally {
            setCarregando(false)
        }
    }, [])

    useEffect(() => {
        carregarDados()
    }, [carregarDados])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErro('')
        setSucesso('')
        setSalvando(true)

        try {
            await api.post('/v1/livros/criar', {
                nome,
                idAutor,
                ano: Number(ano),
                editora,
            })

            await carregarDados()
            setNome('')
            setIdAutor('')
            setAno('')
            setEditora('')
            setSucesso('Livro cadastrado com sucesso.')
        } catch (error) {
            setErro(
                error.response?.data?.message ||
                error.message ||
                'Não foi possível cadastrar o livro.',
            )
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
                            type="text"
                            required
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                        />
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="livro-autor">Autor:</label>
                        <select
                            id="livro-autor"
                            required
                            value={idAutor}
                            onChange={(event) => setIdAutor(event.target.value)}
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
                            type="number"
                            min="1"
                            required
                            value={ano}
                            onChange={(event) => setAno(event.target.value)}
                        />
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="livro-editora">Editora:</label>
                        <input
                            id="livro-editora"
                            type="text"
                            required
                            value={editora}
                            onChange={(event) => setEditora(event.target.value)}
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
                        onClick={carregarDados}
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
