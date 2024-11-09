import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import "./Styles/Login.css"

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(data => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/bitacoras');
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <div className="login-box">
        {
          signinErrors.map((error, i) => (
            <div className="login-error" key={i}>
              {error}
            </div>
          ))
        }
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <input 
            type="email" 
            {...register('email', { required: true })} 
            className="login-input" 
            placeholder="Email" 
          />
          {
            errors.email && (
              <p className="error-message">
                Email es requerido
              </p>
            )
          }
          <input 
            type="password" 
            {...register('password', { required: true })} 
            className="login-input" 
            placeholder="Contraseña" 
          />
          {
            errors.password && (
              <p className="error-message">
                Contraseña es requerida
              </p>
            )
          }
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          No tienes una cuenta? <Link to='/register' className="register-link">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage;
