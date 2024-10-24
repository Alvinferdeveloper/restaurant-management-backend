export const    foodDefs = `
    type Food {
        id: ID!
        name: String!
        ingredients: [String]
        price: Float!
        preparation_time: Int!
        admin: Admin!
        image: String!
        available: Boolean!
        deleted:Boolean!
        orders: [Order]
        food_order: [FoodOrder]
        createdAt: String!
        updatedAt: String!
    }    
    
    input FoodInput {
        name: String!
        ingredients: String!
        price: Float!
        preparation_time: Int!
        image: String!
    }

     type Mutation {
        addFood(foodInput: FoodInput): Food
    }
`;