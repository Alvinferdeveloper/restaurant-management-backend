import prisma from "../lib/prisma";
export const userResolvers = {
    Query: {
      users: ()=> {
        return prisma.user.findMany();      },
    },
    Mutation: {
      addUser: async (root, args) => {
        const userRole = await prisma.role.findFirst({ where: { name: "USER"}})
        return prisma.user.create({ data: { roles: { connect: { id: userRole.id}}, ...args.userInput} , include:{ roles: true}});
      }
    }
  };