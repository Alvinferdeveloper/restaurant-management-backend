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