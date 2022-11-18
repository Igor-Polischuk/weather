export interface Location {
    city: string
    country: string
    region: string
    ip: string
    loc: string
}

export interface CityInformation {
    name: string
    country: string
    state: string
    lat: number
    lon: number
}

export interface CurrentLocation {
    city?: string
    lat: number
    lon: number
}