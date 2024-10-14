export const orderDefs = `
    type Order {
        id: ID!
        user: User!
        total: Float!
        date: String!
        food: Food
        food_order: [FoodOrder]
        deleted: Boolean!
    }    
`;