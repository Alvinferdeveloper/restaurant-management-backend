import prisma from "../lib/prisma";
export const tableResolvers = {
    Query: {
      tables: ()=> {
        return prisma.table.findMany();      },
    },
    Mutation: {
      addTable: async (root, args) => {
        const admin = await prisma.admin.findFirst({ where: { roles: { some:{ name: "ADMIN"}}}});
        const lastTableInserted = await prisma.table.findFirst({ orderBy: { id: "desc"}});
        const nextTableNumber = lastTableInserted ? lastTableInserted.table_number + 1 : 1;
        return prisma.table.create({ data: { name: args.tableInput.name, table_number:nextTableNumber, seats: args.tableInput.seats , admin: { connect: { id: admin.id}}}})
      },
    }
  };