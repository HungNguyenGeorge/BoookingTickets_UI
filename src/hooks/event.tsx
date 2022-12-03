import axios from 'axios';
import { useContext } from 'react';

const sLocalUser = localStorage.getItem("user");
const localUser = JSON.parse(sLocalUser)

const headerOpts = {
    headers: {
        'Authorization': `Bearer ${localUser?.apiToken}`
    }
}

export const getAllEvents = async (payload) => {

    const API = `${import.meta.env.VITE_BASE_URL}/api/events`
    const result = await axios.get(API, headerOpts)

    return result;
}
