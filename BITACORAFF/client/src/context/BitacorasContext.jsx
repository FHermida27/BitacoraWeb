import { createContext, useContext, useState } from "react";
import {
    createBitacoraRequest,
    getBitacorasRequest,
    deleteBitacoraRequest,
    getBitacoraRequest,
    updateBitacoraRequest,
} from '../api/bitacoras';

const BitacoraContext = createContext();

export const useBitacoras = () => {
    const context = useContext(BitacoraContext);
    if (!context) {
        throw new Error("useBitacoras debe ser usado dentro de un BitacoraProvider");
    }
    return context;
};

export function BitacoraProvider({ children }) {
    const [bitacoras, setBitacoras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getBitacoras = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getBitacorasRequest(); // Solicita todas las bitácoras
            if (Array.isArray(res.data)) {
                setBitacoras(res.data);  // Establece las bitácoras en el estado
            } else {
                throw new Error("Datos inválidos recibidos");
            }
        } catch (err) {
            setError("No se pudieron cargar las bitácoras.");
        } finally {
            setLoading(false);
        }
    };

    const createBitacora = async (bitacora) => {
        try {
            const res = await createBitacoraRequest(bitacora);
            setBitacoras([...bitacoras, res.data]); // Agrega la nueva bitácora al estado
        } catch (error) {
            console.error("Error al crear la bitácora:", error);
        }
    };

    const deleteBitacora = async (id) => {
        try {
            const res = await deleteBitacoraRequest(id);
            if (res.status === 204) {
                setBitacoras(bitacoras.filter((bitacora) => bitacora._id !== id)); // Elimina la bitácora del estado
            }
        } catch (error) {
            console.error("Error al eliminar la bitácora:", error);
        }
    };

    const getBitacora = async (id) => {
        try {
            const res = await getBitacoraRequest(id);
            return res.data;
        } catch (error) {
            console.error("Error al obtener la bitácora:", error);
        }
    };

    const updateBitacora = async (id, bitacora) => {
        try {
            const res = await updateBitacoraRequest(id, bitacora);
            setBitacoras((prev) =>
                prev.map((b) => (b._id === id ? res.data : b)) // Actualiza la bitácora en el estado
            );
        } catch (error) {
            console.error("Error al actualizar la bitácora:", error);
        }
    };

    return (
        <BitacoraContext.Provider
            value={{
                bitacoras,
                createBitacora,
                getBitacoras,
                deleteBitacora,
                getBitacora,
                updateBitacora,
                loading,
                error,
            }}
        >
            {children}
        </BitacoraContext.Provider>
    );
}
