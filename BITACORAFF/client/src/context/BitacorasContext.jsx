import { createContext, useContext, useState } from "react";
import {
    createBitacoraRequest, getBitacorasRequest, deleteBitacoraRequest,
    getBitacoraRequest, updateBitacoraRequest
} from '../api/bitacoras'

const BitacoraContext = createContext();

export const useBitacoras = () => {
    const context = useContext(BitacoraContext);

    if (!context) {
        throw new Error("useBitacoras debería usarse con un BitacoraProvider")
    }

    return context;
};

export function BitacoraProvider({ children }) {

    const [bitacoras, setBitacoras] = useState([]);

    const getBitacoras = async () => {
            const res = await getBitacorasRequest()
            setBitacoras(res.data)
        
    };

    const createBitacora = async (bitacora) => {
        console.log('Bitacora!')
        const res = await createBitacoraRequest(bitacora)
        console.log(res)
    };

    const deleteBitacora = async (id) => {
        try {
            const res = await deleteBitacoraRequest(id)
            if (res.status === 204) setBitacoras(bitacoras.filter(bitacora => bitacora._id != id))

        } catch (error) {
            console.log(error)
        }
    };

    const getBitacora = async (id) => {
        try {
            const res = await getBitacoraRequest(id)
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateBitacora = async (id, bitacora) => {
        try {
            await updateBitacoraRequest(id, bitacora)
        } catch (error) {
            console.error(error)
        }
    }

    return <BitacoraContext.Provider value={{
        bitacoras,
        createBitacora,
        getBitacoras,
        deleteBitacora,
        getBitacora,
        updateBitacora
    }}>
        {children}
    </BitacoraContext.Provider>

}