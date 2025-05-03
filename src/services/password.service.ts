import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10;
export function hassPassword(password:string){
    return bcrypt.hashSync(password, SALT_ROUNDS);
}
export function comparePassword(password:string, hashedPassword:string){
    return bcrypt.compareSync(password, hashedPassword);
}