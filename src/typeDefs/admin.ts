export const adminDefs = `
     enum AdminGender {
        F
        M
    }
    
    type Admin {
        id: ID!
        name: String!
        lastName: String!
        cedula: String!
        phone_number: String
        email: String
        gender: AdminGender!
        inss: String
        deleted: Boolean
        roles: [Role]
        createdAt: String!
        updatedAt: String!
        tables: [Table]
        foods: [Food]
    }    
`;