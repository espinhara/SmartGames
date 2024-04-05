export interface GoogleGeocodeResponse {
    results: GoogleGeocodeResult[];
}

export interface GoogleGeocodeResult {
    formatted_address: string;
    geometry: Geometry;
    address_components: AddressComponent[];
}

interface Geometry {
    location: Location;
}

interface Location {
    lat: number;
    lng: number;
}

interface AddressComponent {
    short_name: string;
    long_name: string;
    types: string[];
}
