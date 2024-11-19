import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./Styles/Login.css";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: signinErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            console.log("Intentando iniciar sesión con:", data);
            await signin(data);
        } catch (error) {
            console.error("Error en login:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/bitacoras');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="login-container">
            <div className="login-box">
                {signinErrors.length > 0 && (
                    <div className="error-container">
                        {signinErrors.map((error, i) => (
                            <div key={i} className="login-error">
                                {error}
                            </div>
                        ))}
                    </div>
                )}
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            {...register('email', { 
                                required: "El email es requerido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido"
                                }
                            })} 
                            className="login-input" 
                            placeholder="Email" 
                        />
                        {errors.email && (
                            <p className="error-message">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            {...register('password', { 
                                required: "La contraseña es requerida",
                                minLength: {
                                    value: 6,
                                    message: "La contraseña debe tener al menos 6 caracteres"
                                }
                            })} 
                            className="login-input" 
                            placeholder="Contraseña" 
                        />
                        {errors.password && (
                            <p className="error-message">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <p className="register-text">
                    ¿No tienes una cuenta? {" "}
                    <Link to='/register' className="register-link">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;