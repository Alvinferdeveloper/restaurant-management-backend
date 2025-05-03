export type FoodUpdate = {
    id: string,
    name?: string,
    ingredients?: string,
    price?: number,
    preparation_time?: number,
    image?: string,
    available?: boolean
}

export type TableUpdate = {
    id: string,
    name?: string,
    seats?: number
}