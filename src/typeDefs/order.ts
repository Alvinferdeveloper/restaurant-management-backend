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
        user_id: Int
        total: Float!
        foodOrders: [FoodOrderInput]!
    }
    
    type Mutation {
        addOrder(orderInput: OrderInput): Order
    }
`;