export interface GooglePlacesNearbyResponse {
    results: GooglePlacesNearbyResult[];
}

export interface GooglePlacesNearbyResult {
    geometry: Geometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    place_id: string;
    formatted_address: string;
    reference: string;
    scope: string;
    types: string[];
    vicinity: string;
}

interface Geometry {
    location: Location;
}

interface Location {
    lat: number;
    lng: number;
}
