import prisma from "../lib/prisma";
export const userResolvers = {
    Query: {
      users: ()=> {
        return prisma.user.findMany();      }
    },
  };