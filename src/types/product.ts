import StoreAddress from "./storyAddress";

export interface Product {
    _id: string;
    name: string;
    description: string;
    imageLink: string;
    shops: string;
    price: string;
    platforms: string;
    storeAddresses: StoreAddress[];
}