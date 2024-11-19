import { createContext, useContext, useState } from 'react'
import { 
    createBitacoraRequest, 
    deleteBitacoraRequest, 
    getBitacoraRequest, 
    updateBitacoraRequest, 
    getAllBitacorasRequest, 
    getUserBitacorasRequest 
} from '../api/bitacoras'

const BitacoraContext = createContext();

export const useBitacoras = () => {
    const context = useContext(BitacoraContext);
    if (!context) throw new Error("useBitacoras must be used within a BitacoraProvider");
    return context;
}

export const BitacoraProvider = ({ children }) => {
    const [bitacoras, setBitacoras] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllBitacoras = async () => {
        try {
            setLoading(true);
            const res = await getAllBitacorasRequest();
            setBitacoras(res.data);
        } catch (error) {
            console.error(error);
            setError('Error al obtener las bitácoras');
        } finally {
            setLoading(false);
        }
    };

    const getUserBitacoras = async () => {
        try {
            setLoading(true);
            const res = await getUserBitacorasRequest();
            setBitacoras(res.data);
        } catch (error) {
            console.error(error);
            setError('Error al obtener las bitácoras del usuario');
        } finally {
            setLoading(false);
        }
    };
    
        const createBitacora = async (bitacora) => {
            try {
                setLoading(true);
                const res = await createBitacoraRequest(bitacora);
                setBitacoras([...bitacoras, res.data]);
                return res.data;
            } catch (error) {
                console.error("Error al crear bitácora:", error);
                setError(error.response?.data?.message || 'Error al crear la bitácora');
                throw error;
            } finally {
                setLoading(false);
            }
        };

    const deleteBitacora = async (id) => {
        try {
            const res = await deleteBitacoraRequest(id);
            if (res.status === 204) {
                setBitacoras(bitacoras.filter(bitacora => bitacora._id !== id));
            }
        } catch (error) {
            console.error(error);
            setError('Error al eliminar la bitácora');
        }
    };

    const getBitacora = async (id) => {
        try {
            const res = await getBitacoraRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
            setError('Error al obtener la bitácora');
        }
    };

    const updateBitacora = async (id, bitacora) => {
        try {
            const res = await updateBitacoraRequest(id, bitacora);
            setBitacoras(bitacoras.map(b => b._id === id ? res.data : b));
            return res.data;
        } catch (error) {
            console.error(error);
            setError('Error al actualizar la bitácora');
        }
    };

    return (
        <BitacoraContext.Provider value={{
            bitacoras,
            loading,
            error,
            getAllBitacoras,
            getUserBitacoras,
            createBitacora,
            deleteBitacora,
            getBitacora,
            updateBitacora
        }}>
            {children}
        </BitacoraContext.Provider>
    )
}