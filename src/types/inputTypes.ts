type Gender = "F" | "M"

export type UserInput = {
    name: string,
    lastName: string,
    cedula: string,
    phone_number: string,
    email: string,
    password: string,
    gender: Gender
}

export type FoodInput = {
    name: string,
    ingredients: string,
    price: number,
    preparation_time: number,
    image: string
}

export type FoodOrderInput = {
    food_id: number,
    amount: number,
    total: number
}

export type OrderInput = {
    total: number,
    foodOrders: FoodOrderInput[]
}

export type TableInput = {
    name: string,
    seats: number
}