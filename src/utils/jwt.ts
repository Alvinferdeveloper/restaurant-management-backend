import jwt from 'jwt-simple'
type Payload  = {
    id: number,
    name: string,
    lastName: string,
    cedula: string,
    phone_number: string,
    email: string,
    gender: string,

}

const secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')
 
export const generateToken = (payload: Payload)=> {
    return jwt.encode(payload, secret.toString());
} 