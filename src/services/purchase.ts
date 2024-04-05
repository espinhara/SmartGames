import api from './index';
import { serverUrl } from '../env';

export default class Purchases {
    static listPurchases = async () => {
        return await api.get(`${serverUrl}purchases/`)
    }

    static getPurchase = async (id: string) => {
        const { data } = await api.get(`${serverUrl}/purchases/${id}`)
        return data;
    }

    static savePurchase = async (model: any) => {
        console.log(model)
        const data = await api.post(`${serverUrl}purchases`, model)
        return data
    }
}