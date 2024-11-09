// import { Navigate, Outlet } from "react-router-dom"
// import { useAuth } from "./context/AuthContext"

// const ProtectedRoute = () => {
//     const { loading, isAuthenticated } = useAuth();

//     if(loading) return <h1>
//         Cargando...
//     </h1>
//     if (!loading && !isAuthenticated) return <Navigate to='/login' replace />;

//     return <Outlet />;
// }

// export default ProtectedRoute

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return <div className="loading">Cargando...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
