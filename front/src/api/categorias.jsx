import api from './api'

export const buscar = async () => {
    const response = await api.get('/v1/categorias/buscar', {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const detalhe = async (id) => {
    const response = await api.get(`/v1/categorias/detalhe/${id}`, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const criar = async (nome, genero, formato, livros) => {
    const body = { nome, genero, formato, livros }
    const response = await api.post('/v1/categorias/criar', body, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const alterar = async (id, nome, genero, formato, livros) => {
    const body = { nome, genero, formato, livros }
    const response = await api.put(`/v1/categorias/alterar/${id}`, body, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}

export const deletar = async (id) => {
    const response = await api.delete(`/v1/categorias/deletar/${id}`, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}