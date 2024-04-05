import { Product } from "./product";

export default interface Purchase {
    createdAt: string;
    _id: string;
    // product: string;
    discount: string;
    product: Product;
}