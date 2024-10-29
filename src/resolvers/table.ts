import prisma from "../lib/prisma";
import { authAsync } from "../utils/auth";
export const tableResolvers = {
    Query: {
      tables: ()=> {
        return prisma.table.findMany();      },
    },
    Mutation: {
      addTable: authAsync(async (root, args) => {
        const admin = await prisma.admin.findFirst({ where: { roles: { some:{ name: "ADMIN"}}}});
        const lastTableInserted = await prisma.table.findFirst({ orderBy: { id: "desc"}});
        const nextTableNumber = lastTableInserted ? lastTableInserted.table_number + 1 : 1;
        return prisma.table.create({ data: { name: args.tableInput.name, table_number:nextTableNumber, seats: args.tableInput.seats , admin: { connect: { id: admin.id}}}})
      }, ['ADMIN']),
      updateTable: authAsync(async (rootCertificates, args) => {
        const { id, ...restProp} = args.tableUpdate;
        return prisma.table.update({ where: { id: Number(id) }, data:{ ...restProp}})
      }, ['ADMIN']),

      deleteTable: authAsync(async (root, args) => {
        const { id } = args; 
        return await prisma.table.delete({ where: { id: Number(id) }}) ? true : false;
      }, ['ADMIN'])
    }
  };