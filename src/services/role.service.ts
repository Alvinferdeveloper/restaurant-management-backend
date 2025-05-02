import prisma from "../lib/prisma";

export function getRoleByname(name: string) {
    return prisma.role.findFirst({ where: { name } })
}