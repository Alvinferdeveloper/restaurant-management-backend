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
