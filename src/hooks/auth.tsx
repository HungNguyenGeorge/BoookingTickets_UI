import axios from 'axios';

export const login = async (payload) => {
    const API = `${import.meta.env.VITE_BASE_URL}/api/auth/login`
    const result = await axios.post(API, payload)

    return result;
}
