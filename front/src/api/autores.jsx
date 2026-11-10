import api from './api'

export const listar = async () => {
    const response = await api.get('/v1/autores/listar', {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const detalhe = async (id) => {
    const response = await api.get(`/v1/autores/detalhe/${id}`, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const criar = async (nome, idLivro) => {
    const body = { nome, idLivro }
    const response = await api.post('/v1/autores/criar', body, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const alterar = async (id, nome, idLivro) => {
    const body = { nome, idLivro }
    const response = await api.put(`/v1/autores/alterar/${id}`, body, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const deletar = async (id) => {
    const response = await api.delete(`/v1/autores/deletar/${id}`, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}