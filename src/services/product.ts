import api from './index';
import { serverUrl } from '../env';

export default class Products {
    static listProducts = async () => {
        return await api.get(`${serverUrl}products/`)
    }

    static getProduct = async (id: string) => {
        return (await api.get(`${serverUrl}products/${id}`)).data
    }
}