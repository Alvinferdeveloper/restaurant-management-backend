import prisma from "../lib/prisma";
import supabase from "../lib/supabase";
import { decodeToken } from "../services/token.service";
import { authAsync } from "../utils/auth";
export const orderResolvers = {
    Query: {
    },
    Mutation: {
        addOrder: authAsync(async(root, args)=>{
            const { orderInput } = args;
            console.log(orderInput);
            return prisma.order.create({
                data: {
                    user_id:orderInput.user_id,
                    total: orderInput.total,
                    food_order:{
                        create: orderInput.foodOrders.map(foodOrder => (
                            {
                                food: { connect:{ id: foodOrder.food_id}},
                                amount: foodOrder.amount,
                                total: foodOrder.total
                            }
                        ))
                    }
                }
            })
        },["USER"])
    }
};