import axios from 'axios';

export const createOrder = async ({ event, ticket, totalPrice, quantity, status }) => {
    const sLocalUser = localStorage.getItem("user");
    const localUser = JSON.parse(sLocalUser || "{}")
    const userId = localUser?.id;
    const today = new Date().toISOString();
    const orderData = {
        owner: userId,
        event: event,
        ticket: ticket,
        purchase_date: today,
        total_price: totalPrice,
        quantity,
        status: status || 0
    }
    const API = `${import.meta.env.VITE_BASE_URL}/api/orders`
    const result = await axios.post(API, orderData)

    return result;
}
