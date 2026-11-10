import api from './api'

export const alterar = async (id, email, senha) => {
    const body = { email, senha }
    const response = await api.put(`/v1/bibliotecario/alterar/${id}`, body,
        {
            headers: { 'Content-Type': 'application/json' }
        })

    return response.data
}

export const login = async (email, senha) => {
    const body = { email, senha }
    const response = await api.post('/v1/bibliotecario/login', body, {
        headers: { 'Content-Type': 'application/json' }
    })

    return response.data
}

export const criar = async (nome, email, senha) => {
    const body = { nome, email, senha }
    const response = await api.post('/v1/bibliotecario/criar', body, {
        headers: { 'Content-Type': 'application/json' }
    })

    return response.data
}


export const deletar = async (id) => {
    const response = await api.delete(`/v1/bibliotecario/deletar/${id}`, {
        headers: { 'Content-Type': 'application/json' }
    })

    return response.data
}

export const detalhe = async (id, biblio) => {
    const body = { biblio }
    const response = await api.get(`/v1/bibliotecario/detalhe/${id}`, body, {
        headers: { 'Content-Type': 'application/json' }
    })

    return response.data
}

export const listar = async () => {
    const response = await api.get('/v1/bibliotecario/listar', {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}







