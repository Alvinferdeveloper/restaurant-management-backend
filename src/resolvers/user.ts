import prisma from "../lib/prisma";
export const userResolvers = {
    Query: {
      users: ()=> {
        return prisma.user.findMany();      },
    },
    Mutation: {
      userRegister: async (root, args) => {
        const userRole = await prisma.role.findFirst({ where: { name: "USER"}})
        return prisma.user.create({ data: { roles: { connect: { id: userRole.id}}, ...args.userInput} , include:{ roles: true}});
      },
      login: async (root, args) => {
        const user =  await prisma.user.findFirst({ where: { email: args.email, password: args.password}, include:{ roles:true}});
        if(user) return user;
        else return prisma.admin.findFirst({ where: { email: args.email, password: args.password}, include:{ roles: true}});
      }
    }
  };