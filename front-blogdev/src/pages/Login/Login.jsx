import React, { useState, useEffect } from "react";
import { userLogin } from "../../hooks/userAuthentication";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = userLogin();

  const navigate = useNavigate()

  useEffect(() => {
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      email,
      password,
    };

    if (!email || !password) {
      setError("Preencha todos os campos")
      return
    }

    try {
      const res = await login(user);
      if (res) {
        navigate('/')
        console.table(res);
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div>
      <h1>Login</h1>
      <p>Entre com seu email e senha</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Entrando...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
export default Login;