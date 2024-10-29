import jwt from 'jwt-simple'
interface PayLoad {
    id: number,
    name: string,
    lastName: string,
    cedula: string,
    email: string,
    gender: 'M' | 'F',
    roles: string[],

}
export function generateToken(payload: PayLoad){
    return jwt.encode(payload, process.env.JWT_SECRET_KEY );
}

export function decodeToken (token: string) {
    return jwt.decode(token, process.env.JWT_SECRET_KEY);
}