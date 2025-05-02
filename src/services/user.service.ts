import prisma from "../lib/prisma";
import { UserInput } from "../types/graphql";
import * as roleService from "./role.service";
import { GraphQLError } from "graphql";
import bcrypt from 'bcrypt'
import { generateToken } from "../services/token.service";

export function getAllUsers() {
    return prisma.user.findMany()
}

export function getUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } })
}

export async function saveUser(userInput: UserInput) {
    const userRole = await roleService.getRoleByname("USER");
    const email = await prisma.user.findFirst({ where: { email: userInput.email } });
    if (email) throw new GraphQLError('EMAIL_EXISTS');
    const hashedPassword = bcrypt.hashSync(userInput.password, 10);
    const user = await prisma.user.create({ data: { roles: { connect: { id: userRole.id } }, ...userInput, password: hashedPassword }, include: { roles: true } });
    const roles = user.roles.map(role => role.name);
    const token = generateToken({ ...user, roles });
    return { user, token }
}