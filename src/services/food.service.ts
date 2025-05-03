import prisma from "../lib/prisma";
import { FoodInput } from "../types/inputTypes";
import supabase from "../lib/supabase";
import { FoodUpdate } from "../types/updateTypes";

export function getAllFoods() {
    return prisma.food.findMany({ where: { deleted: false } })
}

export async function addFood(foodInput: FoodInput, adminId: number) {
    const publicImageUrl = supabase.storage.from('food').getPublicUrl(foodInput.image);
    return prisma.food.create({ data: { ...foodInput, image: publicImageUrl.data.publicUrl, admin: { connect: { id: adminId } } } })
}

export async function deleteFood(id: string) {
    return await prisma.food.update({ where: { id: Number(id) }, data: { deleted: true } }) ? true : false;;
}

export async function toogleStatus(id: string) {
    return prisma.food.update({
        where: { id: Number(id) },
        data: {
            available: {
                set: await prisma.food.findUnique({ where: { id: Number(id) } }).then(food => !food.available)
            }
        }
    });
}

export async function updateFood(id: string, foodUpdate: Omit<FoodUpdate, 'id'>) {
    return prisma.food.update({ where: { id: Number(id) }, data: { ...foodUpdate } })
}