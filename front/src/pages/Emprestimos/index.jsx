import { useEffect, useState } from 'react'
import api from '../../api/api'
import { criar, deletar } from '../../api/emprestimos'
import '../Livros/style.css'
import './style.css'

function getErrorMessage(error, fallback) {
    return error.response?.data?.message || error.message || fallback
}

async function carregarDados(setLivros, setEmprestimos, setErro, setCarregando) {
    setCarregando(true)
    setErro('')

    try {
        const [respostaLivros, respostaEmprestimos] = await Promise.all([
            api.get('/v1/livros/listar'),
            api.get('/v1/emprestimos/listar'),
        ])

        if (!Array.isArray(respostaLivros.data?.message) || !Array.isArray(respostaEmprestimos.data?.message)) {
            throw new Error('Não foi possível carregar os empréstimos.')
        }

        setLivros(respostaLivros.data.message)
        setEmprestimos(respostaEmprestimos.data.message)
    } catch (error) {
        setErro(getErrorMessage(error, 'Não foi possível carregar os empréstimos.'))
    } finally {
        setCarregando(false)
    }
}

function Emprestimos() {
    const [livros, setLivros] = useState([])
    const [emprestimos, setEmprestimos] = useState([])
    const [idLivro, setIdLivro] = useState('')
    const [requerimento, setRequerimento] = useState('')
    const [devolucao, setDevolucao] = useState('')
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [salvando, setSalvando] = useState(false)
    const [excluindo, setExcluindo] = useState(null)

    useEffect(() => {
        carregarDados(setLivros, setEmprestimos, setErro, setCarregando)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErro('')
        setSucesso('')

        const livro = livros.find((item) => String(item.id) === idLivro)
        if (!livro) {
            setErro('Selecione um livro.')
            return
        }

        setSalvando(true)
        try {
            await criar({
                idLivro: livro.id,
                idAutor: livro.idAutor,
                requerimento,
                devolucao,
            })
            setIdLivro('')
            setRequerimento('')
            setDevolucao('')
            setSucesso('Empréstimo cadastrado.')
            await carregarDados(setLivros, setEmprestimos, setErro, setCarregando)
        } catch (error) {
            setErro(getErrorMessage(error, 'Não foi possível cadastrar o empréstimo.'))
        } finally {
            setSalvando(false)
        }
    }

    const excluirEmprestimo = async (id) => {
        setErro('')
        setExcluindo(id)

        try {
            await deletar(id)
            setEmprestimos((atual) => atual.filter((emprestimo) => String(emprestimo.id) !== String(id)))
        } catch (error) {
            setErro(getErrorMessage(error, 'Não foi possível excluir o empréstimo.'))
        } finally {
            setExcluindo(null)
        }
    }

    const nomeLivro = (id) => livros.find((livro) => String(livro.id) === String(id))?.nome || `Livro #${id}`

    return (
        <main className="livros-page">
            <section className="livros-form-section">
                <form className="livros-form" onSubmit={handleSubmit}>
                    <h1>Cadastro de empréstimos</h1>
                    <p className="livros-subtitle">Preencha os dados para registrar um empréstimo.</p>

                    {erro && <p className="livros-feedback livros-error" role="alert">{erro}</p>}
                    {sucesso && <p className="livros-feedback livros-success" role="status">{sucesso}</p>}

                    <div className="livros-input-group">
                        <label htmlFor="emprestimo-livro">Livro:</label>
                        <select
                            id="emprestimo-livro"
                            value={idLivro}
                            onChange={(event) => setIdLivro(event.target.value)}
                            required
                            disabled={livros.length === 0}
                        >
                            <option value="" disabled>
                                {livros.length ? 'Selecione um livro' : 'Nenhum livro disponível'}
                            </option>
                            {livros.map((livro) => (
                                <option key={livro.id} value={livro.id}>{livro.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="emprestimo-data">Data do empréstimo:</label>
                        <input
                            id="emprestimo-data"
                            type="date"
                            value={requerimento}
                            onChange={(event) => setRequerimento(event.target.value)}
                            required
                        />
                    </div>

                    <div className="livros-input-group">
                        <label htmlFor="emprestimo-devolucao">Data de devolução:</label>
                        <input
                            id="emprestimo-devolucao"
                            type="date"
                            value={devolucao}
                            onChange={(event) => setDevolucao(event.target.value)}
                            required
                        />
                    </div>

                    <button className="livros-submit" type="submit" disabled={!livros.length || salvando}>
                        {salvando ? 'Cadastrando...' : 'Cadastrar empréstimo'}
                    </button>
                </form>
            </section>

            <section className="livros-list-section">
                <div className="livros-list-heading">
                    <div>
                        <h2>Empréstimos cadastrados</h2>
                        <p>{emprestimos.length} {emprestimos.length === 1 ? 'empréstimo' : 'empréstimos'}</p>
                    </div>
                    <button
                        className="livros-refresh"
                        type="button"
                        onClick={() => carregarDados(setLivros, setEmprestimos, setErro, setCarregando)}
                        disabled={carregando}
                    >
                        Atualizar lista
                    </button>
                </div>

                {carregando ? (
                    <p className="livros-empty">Carregando empréstimos...</p>
                ) : emprestimos.length === 0 ? (
                    <p className="livros-empty">Ainda não há empréstimos.</p>
                ) : (
                    <ul className="livros-list">
                        {emprestimos.map((emprestimo) => (
                            <li className="livros-list-item emprestimo-item" key={emprestimo.id}>
                                <div>
                                    <strong>{nomeLivro(emprestimo.idLivro)}</strong>
                                </div>
                                <div className="livros-details">
                                    <span>Empréstimo: {emprestimo.requerimento}</span>
                                    <span>Devolução: {emprestimo.devolucao}</span>
                                </div>
                                <button
                                    className="emprestimo-delete"
                                    type="button"
                                    onClick={() => excluirEmprestimo(emprestimo.id)}
                                    disabled={String(excluindo) === String(emprestimo.id)}
                                >
                                    {String(excluindo) === String(emprestimo.id) ? 'Excluindo...' : 'Excluir'}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}

export default Emprestimos