import { useEffect, useState } from 'react'
import api from '../../api/api'
import '../Livros/style.css'
import './style.css'

const formularioInicial = { nome: '' }
const chaveCategoriaLivro = (idLivro) => `biblioteca:livro:${idLivro}:categoria`

function getErrorMessage(error, fallback) {
    return error.response?.data?.message || error.message || fallback
}

async function carregarDados(setCategorias, setLivros, setAssociacoes, setErro, setCarregando) {
    setCarregando(true)
    setErro('')

    try {
        const [respostaCategorias, respostaLivros] = await Promise.all([
            api.get('/v1/categorias/listar'),
            api.get('/v1/livros/listar'),
        ])

        if (!Array.isArray(respostaCategorias.data?.message) || !Array.isArray(respostaLivros.data?.message)) {
            throw new Error('Não foi possível carregar as categorias e os livros.')
        }

        const associacoes = {}
        respostaLivros.data.message.forEach((livro) => {
            const idCategoria = localStorage.getItem(chaveCategoriaLivro(livro.id))
            if (idCategoria) {
                associacoes[livro.id] = idCategoria
            }
        })

        setCategorias(respostaCategorias.data.message)
        setLivros(respostaLivros.data.message)
        setAssociacoes(associacoes)
    } catch (error) {
        setErro(getErrorMessage(error, 'Não foi possível carregar as categorias e os livros.'))
    } finally {
        setCarregando(false)
    }
}

function Categorias() {
    const [categorias, setCategorias] = useState([])
    const [livros, setLivros] = useState([])
    const [associacoes, setAssociacoes] = useState({})
    const [formulario, setFormulario] = useState(formularioInicial)
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null)
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [salvando, setSalvando] = useState(false)

    useEffect(() => {
        carregarDados(setCategorias, setLivros, setAssociacoes, setErro, setCarregando)
    }, [])

    const atualizarCampo = (event) => {
        const { name, value } = event.target
        setFormulario((atual) => ({ ...atual, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErro('')

        const nome = formulario.nome.trim()
        if (categorias.some((categoria) => categoria.nome.toLowerCase() === nome.toLowerCase())) {
            setErro('Essa categoria já está cadastrada.')
            return
        }

        setSalvando(true)
        try {
            await api.post('/v1/categorias/criar', {
                nome,
                genero: nome,
                formato: 'Todos',
                livros: '[]',
            })

            setFormulario(formularioInicial)
            await carregarDados(setCategorias, setLivros, setAssociacoes, setErro, setCarregando)
        } catch (error) {
            setErro(getErrorMessage(error, 'Não foi possível cadastrar a categoria.'))
        } finally {
            setSalvando(false)
        }
    }

    const livrosDaCategoria = (categoria) => (
        livros.filter((livro) => String(associacoes[livro.id]) === String(categoria.id))
    )

    return (
        <main className="livros-page categorias-page">
            <section className="livros-form-section">
                <form className="livros-form" onSubmit={handleSubmit}>
                    <h1>Cadastro de categorias</h1>

                    {erro && <p className="livros-feedback livros-error" role="alert">{erro}</p>}

                    <div className="livros-input-group">
                        <label htmlFor="categoria-nome">Nome da categoria:</label>
                        <input
                            id="categoria-nome"
                            name="nome"
                            type="text"
                            required
                            value={formulario.nome}
                            onChange={atualizarCampo}
                        />
                    </div>

                    <button className="livros-submit" type="submit" disabled={salvando}>
                        Cadastrar categoria
                    </button>
                </form>
            </section>

            <section className="livros-list-section">
                <div className="livros-list-heading">
                    <div>
                        <h2>Categorias cadastradas</h2>
                        {!carregando && <p>{categorias.length} {categorias.length === 1 ? 'categoria' : 'categorias'}</p>}
                    </div>
                    <button
                        className="livros-refresh"
                        type="button"
                        onClick={() => carregarDados(setCategorias, setLivros, setAssociacoes, setErro, setCarregando)}
                        disabled={carregando}
                    >
                        Atualizar lista
                    </button>
                </div>

                {!carregando && (categorias.length === 0 ? (
                    <p className="livros-empty">Ainda não há categorias cadastradas.</p>
                ) : (
                    <ul className="categorias-list">
                        {categorias.map((categoria) => {
                            const livrosCategoria = livrosDaCategoria(categoria)
                            const selecionada = String(categoriaSelecionada) === String(categoria.id)

                            return (
                                <li className="categoria-item" key={categoria.id}>
                                    <button
                                        className="categoria-card"
                                        type="button"
                                        aria-expanded={selecionada}
                                        onClick={() => setCategoriaSelecionada(selecionada ? null : categoria.id)}
                                    >
                                        <h2>{categoria.nome}</h2>
                                        <span>{livrosCategoria.length} {livrosCategoria.length === 1 ? 'livro' : 'livros'}</span>
                                    </button>
                                    {selecionada && (
                                        livrosCategoria.length === 0 ? (
                                            <p className="livros-empty">Ainda não há livros nesta categoria.</p>
                                        ) : (
                                            <ul className="categoria-livros">
                                                {livrosCategoria.map((livro) => (
                                                    <li key={livro.id}>
                                                        <strong>{livro.nome}</strong>
                                                        <span>{livro.ano} · {livro.editora}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                ))}
            </section>
        </main>
    )
}

export default Categorias
