import prisma from "../lib/prisma";
import { FoodInput } from "../types/inputTypes";
import supabase from "../lib/supabase";

export function getAllFoods() {
    return prisma.food.findMany({ where: { deleted: false } })
}

export async function addFood(foodInput: FoodInput, adminId: number) {
    const publicImageUrl = supabase.storage.from('food').getPublicUrl(foodInput.image);
    return prisma.food.create({ data: { ...foodInput, image: publicImageUrl.data.publicUrl, admin: { connect: { id: adminId } } } })
}