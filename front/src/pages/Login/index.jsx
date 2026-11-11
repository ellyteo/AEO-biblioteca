
import { useState } from 'react';
import './style.css'
import {useNavigate} from 'react-router-dom'
import { login } from '../../api/bibliotecario';

export default function Login() {
const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const response = await login(email, senha)
      if (!response?.token) {
        throw new Error('A resposta do servidor não contém um token válido.')
      }

      localStorage.setItem('token', response.token)
      navigate('/bibliotecario')
    } catch (error) {
      setErro(
        error.response?.data?.message ||
        error.message ||
        'Não foi possível realizar o login.'
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {erro && <p className="error" role="alert">{erro}</p>}
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <p>Não possui conta? <span className="signup">Cadastre-se</span></p>
        <button
          className="button"
          type="submit"
          disabled={carregando}
        >{carregando ? 'Entrando...' : 'Entrar'}</button>
        <button
          className="button back-button"
          onClick={() => { }}
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
