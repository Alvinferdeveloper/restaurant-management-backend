export const foodOrderDefs = `
    type FoodOrder {
       order_Id: ID!
       food_Id: ID!
       amount: Int!
       total_amount: Float!
       order: Order
       food: Food
    }    

    input FoodOrderInput {
        food_id: Int!
        amount: Int!
        total: Float!
    }
`;