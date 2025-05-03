import prisma from "../lib/prisma";
import { decodeToken } from "../services/token.service";
import { authAsync } from "../utils/auth";
import { FoodInput } from "../types/inputTypes";
import { FoodUpdate } from "../types/updateTypes";
import * as foodService from "../services/food.service";

export const foodResolvers = {
    Query: {
        foods: authAsync(() => {
            return foodService.getAllFoods();
        }, [])
    },
    Mutation: {
        addFood: authAsync(async (root, args: { foodInput: FoodInput }, token) => {
            const { foodInput } = args;
            const adminPayload = decodeToken(token);
            return foodService.addFood(foodInput, adminPayload.id);
        }, ['ADMIN']),
        deleteFood: authAsync(async (root, args: { id: string }) => {
            const { id } = args;
            return await foodService.deleteFood(id);
        }, ['ADMIN']),
        toogleStatus: authAsync(async (root, args: { id: string }) => {
            const { id } = args;
            return foodService.toogleStatus(id);

        }, ['ADMIN']),
        updateFood: authAsync((root, args: { foodUpdate: FoodUpdate }) => {
            const { id, ...restOfProps } = args.foodUpdate;
            return foodService.updateFood(id, restOfProps);
        }, ['ADMIN'])
    }
};