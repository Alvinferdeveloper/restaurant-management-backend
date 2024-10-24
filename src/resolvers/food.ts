import prisma from "../lib/prisma";
import supabase from "../lib/supabase";
export const foodResolvers = {
    Query:{
        foods:()=> {
            return prisma.food.findMany({ where: { deleted: false }});  
        }
    },
    Mutation: {
        addFood: async (root, args) => {
            const { foodInput } = args;
            const admin = await prisma.admin.findFirst({ where: { roles: { some:{ name: "ADMIN"}}}});
            const publicImageUrl = await supabase.storage.from('food').getPublicUrl(foodInput.image);
            return prisma.food.create({ data: { ...foodInput , image: publicImageUrl.data.publicUrl, admin: { connect: { id: admin.id}}}})
        },
        deleteFood: async (root, args)=> {
            const { id } = args;
            return await prisma.food.update({ where:{ id: Number(id)}, data:{ deleted:true} }) ? true : false;
        }
    }
};