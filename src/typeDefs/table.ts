export const tableDefs = `
    type Table {
        id: ID!
        name: String!
        admin: Admin!
        available: Boolean!
        deleted:Boolean!
        createdAt: String!
        updatedAt: String!
    }
    input TableInput {
        name: String!
    }

    
    type Query {
        tables: [Table]
    }
    
    type Mutation {
        addTable(tableInput: TableInput): Table
    }
`;