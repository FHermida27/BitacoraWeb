import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Styles/Register.css"

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    // Redirigir a bitacoras si ya está autenticado
    useEffect(() => {
        if (isAuthenticated) navigate("/bitacoras");
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        // Realizar el registro y luego redirigir al Login
        await signup(values);
        // Una vez que se haya completado el registro, redirigir a la página de login
        navigate('/login');
    });

    return (
        <div className="login-container">
            <div className="login-box">
                {
                    registerErrors.map((error, i) => (
                        <div className="login-error" key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1>Regístrate</h1>
                <form onSubmit={onSubmit}>
                    <input 
                        type="text" 
                        {...register('username', { required: true })} 
                        className="login-input" 
                        placeholder="Nombre de Usuario" 
                    />
                    {
                        errors.username && (
                            <p className="error-message">
                                Nombre de usuario es requerido
                            </p>
                        )
                    }
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
                        Register
                    </button>
                </form>
                <p className="flex gap-x-2 justify-between">
                    ¿Ya tienes una cuenta? <Link to="/login" className="register-link">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage;
