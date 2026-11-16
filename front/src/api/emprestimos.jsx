import api from './api'

export const criar = async (emprestimo) => {
    const response = await api.post('/v1/emprestimos/criar', emprestimo)
    return response.data
}

export const atualizar = async (id, emprestimo) => {
    const response = await api.put(`/v1/emprestimos/alterar/${id}`, emprestimo)
    return response.data
}

export const deletar = async (id) => {
    const response = await api.delete(`/v1/emprestimos/deletar/${id}`)
    return response.data
}