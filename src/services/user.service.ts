import prisma from "../lib/prisma";
import { UserInput } from "../types/graphql";
import * as roleService from "./role.service";
import { GraphQLError } from "graphql";
import * as passwordService from "./password.service";
import { generateToken } from "../services/token.service";

export function getAllUsers() {
    return prisma.user.findMany()
}

export function getUserByEmail(email: string, { includeRoles = false }: { includeRoles?: boolean }) {
    return prisma.user.findFirst({ where: { email }, include: { roles: includeRoles } })
}

export async function saveUser(userInput: UserInput) {
    const email = await getUserByEmail(userInput.email, { includeRoles: true });
    if (email) throw new GraphQLError('EMAIL_EXISTS');
    const userRole = await roleService.getRoleByname("USER");
    const hashedPassword = passwordService.hassPassword(userInput.password);
    const user = await prisma.user.create({ data: { roles: { connect: { id: userRole.id } }, ...userInput, password: hashedPassword }, include: { roles: { select: { name: true } } } });
    const roles = user.roles.map(role => role.name);
    const token = generateToken({ ...user, roles });
    return { user, token }
}