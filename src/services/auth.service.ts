import { generateToken } from "../services/token.service";
import bcrypt from 'bcrypt'
import * as userService from "../services/user.service";
import * as adminService from "../services/admin.service";
import { GraphQLError } from "graphql";
import * as passwordService from "./password.service";
import * as roleService from "./role.service";
import prisma from "../lib/prisma";
import { UserInput } from "../types/inputTypes";

export async function login({ email, password }: { email: string, password: string }) {
    let userExists = await userService.getUserByEmail(email, { includeRoles: true });
    if (!userExists) userExists = await adminService.getUserByEmail(email, { includeRoles: true });
    if (!userExists) throw new GraphQLError('USER_NOT_FOUND');
    const passwordMatch = bcrypt.compareSync(password, userExists.password)
    if (!passwordMatch) throw new GraphQLError('INVALID_PASSWORD');
    const roles = userExists.roles.map(role => role.name);
    const token = generateToken({ ...userExists, roles });

    return { user: userExists, token }
}

export async function userRegister(userInput: UserInput) {
    const email = await userService.getUserByEmail(userInput.email, { includeRoles: true });
    if (email) throw new GraphQLError('EMAIL_EXISTS');
    const userRole = await roleService.getRoleByname("USER");
    const hashedPassword = passwordService.hassPassword(userInput.password);
    const user = await prisma.user.create({ data: { roles: { connect: { id: userRole.id } }, ...userInput, password: hashedPassword }, include: { roles: { select: { name: true } } } });
    const roles = user.roles.map(role => role.name);
    const token = generateToken({ ...user, roles });
    return { user, token }
}