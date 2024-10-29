import { decodeToken } from "../services/token.service";
import { GraphQLError } from "graphql";

export const getRoles = (token) => {
    const payload = decodeToken(token);
    return payload.roles;
}

export const isAuthorized = (userRoles: string[], requiredRoles: string[]) => {
    return requiredRoles.some(role => userRoles.includes(role));
}


export const authAsync = (fn, requiredRoles: string[]) => (root, args, { req }) => {
    const token = req.cookies.restaurant_token;
    if (!token) throw new GraphQLError('You are not authenticated.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    })
    const userRoles = getRoles(token);
    if (!isAuthorized(userRoles, requiredRoles) && requiredRoles.length > 0) throw new GraphQLError('You are not authorized to perform this action.', {
        extensions: {
            code: 'FORBIDDEN',
        },
    });
    return fn(root, args, token);

}