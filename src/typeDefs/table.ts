export const tableDefs = `
    type Table {
        id: ID!
        name: String!
        admin: Admin!
        available: Boolean!
        table_number: Int!
        seats: Int!
        deleted:Boolean!
        createdAt: String!
        updatedAt: String!
    }
    input TableInput {
        name: String!
        seats: Int!
    }
    
    input TableUpdate {
     id: ID!
     name: String
     seats: Int
    }
    
    type Query {
        tables: [Table]
    }
    
    type Mutation {
        addTable(tableInput: TableInput): Table
        updateTable(tableUpdate: TableUpdate):Table
        deleteTable(id: ID): Boolean
    }
`;