import prisma from "../lib/prisma";

export function getAllUsers() {
    return prisma.user.findMany()
}

export function getUserByEmail(email: string, { includeRoles = false }: { includeRoles?: boolean }) {
    return prisma.user.findFirst({ where: { email }, include: { roles: includeRoles } })
}
