import api from './api'

export const buscar = async () => {
    const response = await api.get('/v1/livros/buscar', {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const detalhe = async (id) => {
    const response = await api.get(`/v1/livros/detalhe/${id}`, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const criar = async (nome, idAutor, ano, editora) => {
    const body = { nome, idAutor, ano, editora }
    const response = await api.post('/v1/livros/criar', body, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const alterar = async (id, nome, idAutor, ano, editora) => {
    const body = {nome, idAutor, ano, editora }
    const response = await api.put(`/v1/livros/alterar/${id}`, body, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const deletar = async (id) => {
    const response = await api.delete(`/v1/livros/deletar/${id}`, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}