import prisma from "../lib/prisma";
import supabase from "../lib/supabase";
import { decodeToken } from "../services/token.service";
import { authAsync } from "../utils/auth";
export const orderResolvers = {
    Query: {
    },
    Mutation: {
        addOrder: authAsync(async(root, args, token)=>{
            const { orderInput } = args;
            const user = decodeToken(token);
            return prisma.order.create({
                data: {
                    user_id:user.id,
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