import prisma from "../lib/prisma";
import { decodeToken, generateToken } from "../services/token.service";
import { authAsync } from "../utils/auth";
import bcrypt from 'bcrypt'
import * as userService from "../services/user.service";
import { UserInput } from "../types/graphql";
import { Response } from "express";

export const userResolvers = {
  Query: {
    users: authAsync(() => {
      return userService.getAllUsers();
    }, ['ADMIN']),
    user: authAsync((root:unknown, args:unknown, token: string) => {
      const user = decodeToken(token);
      return { id: user.id, name: user.name, roles: user.roles };
    }, ['USER','ADMIN'])
  },
  Mutation: {
    userRegister: async (root:unknown, args: { userInput: UserInput }, { res }: { res: Response }) => {
      const { token, user } = await userService.saveUser(args.userInput);
      res.cookie('restaurant_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
      return user;
    },
    login: async (root:unknown, args: { email: string, password: string }, { res }: { res: Response }) => {
      let userExists;
      userExists = await prisma.user.findFirst({ where: { email: args.email }, include: { roles: true } });
      if (!userExists) userExists = await prisma.admin.findFirst({ where: { email: args.email }, include: { roles: true } });
      if (userExists) {
        const providedPassword = args.password;
        const passwordMatch = bcrypt.compareSync(providedPassword, userExists.password)
        if (passwordMatch) {
          const roles = userExists.roles.map(role => role.name);
          const token = generateToken({ ...userExists, roles });
          res.cookie('restaurant_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
          return userExists;
        }
      }
    },
    logOut: (root:unknown, args:unknown, { res }: { res: Response }) => {
      res.clearCookie('restaurant_token');
      return true;
    }
  }
};