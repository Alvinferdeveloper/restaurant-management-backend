export const orderDefs = `
    type Order {
        id: ID!
        user: User!
        total: Float!
        date: String!
        food: [Food]
        food_order: [FoodOrder]
        deleted: Boolean!
    }    
    


    input OrderInput {
        total: Float!
        foodOrders: [FoodOrderInput]!
    }
    
    type Query {
        orders:[Order]
        order(orderId:ID!): Order
    }
    
    type Mutation {
        addOrder(orderInput: OrderInput): Order
    }
`;