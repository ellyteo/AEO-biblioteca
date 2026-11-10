
import { useState } from 'react';
import './style.css'
import {useNavigate} from 'react-router-dom'
import { login } from '../../api/bibliotecario';


export default function Login() {
const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()// para o envio automatico
   const response = await login(email, senha)
   console.log(response)
   localStorage.setItem('token', response.token)

   return navigate('/')
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
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
        <p>Não possui conta? <spam className="signup" onClick={() => {SignIn}}>Cadastre-se</spam></p>
        <button
          className="button"
          type="submit"
          onClick={handleSubmit}
        >Entrar</button>
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
