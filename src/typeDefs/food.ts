export const    foodDefs = `
    type Food {
        id: ID!
        name: String!
        ingredients: String!
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

     input FoodUpdate {
        id: ID!
        name: String
        ingredients: String
        price: Float
        preparation_time: Int
        image: String
        available: Boolean
    }
    
    type Query {
        foods: [Food]
    }

     type Mutation {
        addFood(foodInput: FoodInput): Food
        deleteFood(id:ID): Boolean
        toogleStatus(id:ID): Food
        updateFood(foodUpdate: FoodUpdate):Food
    }
`;