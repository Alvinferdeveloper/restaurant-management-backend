import prisma from "../lib/prisma";
import supabase from "../lib/supabase";
import { decodeToken } from "../services/token.service";
import { authAsync } from "../utils/auth";
import { FoodInput } from "../types/inputTypes";
import { FoodUpdate } from "../types/updateTypes";

export const foodResolvers = {
    Query: {
        foods: authAsync(() => {
            return prisma.food.findMany({ where: { deleted: false } });
        },[])
    },
    Mutation: {
        addFood: authAsync(async (root, args: { foodInput: FoodInput }, token) => {
            const { foodInput } = args;
            const adminPayload = decodeToken(token);
            const publicImageUrl = await supabase.storage.from('food').getPublicUrl(foodInput.image);
            return prisma.food.create({ data: { ...foodInput, image: publicImageUrl.data.publicUrl, admin: { connect: { id: adminPayload.id } } } })
        },['ADMIN']),
        deleteFood: authAsync(async (root, args: { id: string }) => {
            const { id } = args;
            return await prisma.food.update({ where: { id: Number(id) }, data: { deleted: true } }) ? true : false;
        }, ['ADMIN']),
        toogleStatus:authAsync( async  (root, args: { id: string }) => {
            const { id } = args;
            return await prisma.food.update({
                where: { id: Number(id) },
                data: {
                    available: {
                        set: await  prisma.food.findUnique({ where: { id: Number(id) } }).then(food => !food.available)
                    }
                }
            });
             
    }, ['ADMIN']),
    updateFood: authAsync((root, args: { foodUpdate: FoodUpdate }) => {
        const { id, ...restOfProps } = args.foodUpdate;
        return prisma.food.update({ where: { id: Number(id) }, data: { ...restOfProps}})
    }, ['ADMIN'])
}
};