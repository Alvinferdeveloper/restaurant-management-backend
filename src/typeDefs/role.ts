export const roleDef = `
    type Role {
        id: ID!
        name: String
        users: [User]
        admins: [Admin]
    }
`