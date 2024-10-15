import prisma from "../lib/prisma";
export const tableResolvers = {
    Query: {
      tables: ()=> {
        return prisma.table.findMany();      },
    },
    Mutation: {
      addTable: async (root, args) => {
        const admin = await prisma.admin.findFirst({ where: { roles: { some:{ name: "ADMIN"}}}});
        return prisma.table.create({ data: { name: args.tableInput.name, admin: { connect: { id: admin.id}}}})
      },
    }
  };