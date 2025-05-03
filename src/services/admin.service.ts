import prisma from "../lib/prisma";

export function getUserByEmail(email: string, { includeRoles = false }: { includeRoles?: boolean }) {
    return prisma.admin.findFirst({ where: { email }, include: { roles: includeRoles } })
}