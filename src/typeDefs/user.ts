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
    
    input UserInput {
     name: String!
        lastName: String!
        cedula: String!
        phone_number: String
        email: String
        password: String!
        gender: UserGender!
    }

    type Query {
        users: [User]
    }
    
    type Mutation {
        userRegister(userInput: UserInput): User
        login(email:String!, password:String): User
    }
    
`;