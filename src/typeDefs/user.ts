export const userDefs = `
    enum UserGender {
        F
        M
    }
    
    type User {
        id: ID!
        name: String!
        lastName: String!
        cedula: String!
        phone_number: String
        email: String
        gender: UserGender!
        roles: [Role]
        createdAt: String!
        updatedAt: String! 
    }

    type Query {
        users: [User]
    }
    
`;