import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/Register.css";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const [registerStatus, setRegisterStatus] = useState(null);
  useEffect(() => {
    if (isAuthenticated) navigate("/bitacoras");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values); // Intentamos el registro
      setRegisterStatus({
        type: "success",
        message: "¡Registro exitoso! Puedes iniciar sesión ahora.",
      }); // Mensaje de éxito
      navigate("/login"); // Redirigir a login tras éxito
    } catch (error) {
      setRegisterStatus({
        type: "error",
        message: "Error al registrarse. Por favor, intenta de nuevo.",
      }); // Mensaje de error
    }
  });

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Mostrar errores de registro de la API si existen */}
        {registerErrors.length > 0 &&
          registerErrors.map((error, i) => (
            <div className="login-error" key={i}>
              {error}
            </div>
          ))}

        {/* Mostrar el estado de registro */}
        {registerStatus && (
          <div
            className={`status-message ${
              registerStatus.type === "error"
                ? "error-message"
                : "success-message"
            }`}
          >
            {registerStatus.message}
          </div>
        )}

        <h1>Regístrate</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="login-input"
            placeholder="Nombre de Usuario"
          />
          {errors.username && (
            <p className="error-message">Nombre de usuario es requerido</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="login-input"
            placeholder="Email"
          />
          {errors.email && <p className="error-message">Email es requerido</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="login-input"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="error-message">Contraseña es requerida</p>
          )}

          {/* Opción de rol */}
          <div className="role-selection">
            <label className="role-label">
              <input
                type="radio"
                {...register("role", { required: true })}
                value="administrador"
                className="role-radio"
              />
              <span className="role-circle"></span>
              Administrador
            </label>
            <label className="role-label">
              <input
                type="radio"
                {...register("role", { required: true })}
                value="investigador"
                className="role-radio"
              />
              <span className="role-circle"></span>
              Investigador
            </label>
            <label className="role-label">
              <input
                type="radio"
                {...register("role", { required: true })}
                value="colaborador"
                className="role-radio"
              />
              <span className="role-circle"></span>
              Colaborador
            </label>
            {errors.role && <p className="error-message">Selecciona un rol</p>}
          </div>

          <button type="submit" className="login-button">
            Registrar
          </button>
        </form>

        <p className="justify-between">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="register-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
