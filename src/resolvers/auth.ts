import { UserInput } from "../types/inputTypes";
import { Response } from "express";
import * as authService from "../services/auth.service";

export const authResolvers = {
  Mutation: {
    userRegister: async (root:unknown, args: { userInput: UserInput }, { res }: { res: Response }) => {
      const { token, user } = await authService.userRegister(args.userInput);
      res.cookie('restaurant_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
      return user;
    },
    login: async (root:unknown, args: { email: string, password: string }, { res }: { res: Response }) => {
      const { user, token } = await authService.login(args);
      res.cookie('restaurant_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
      return user;
    },
    logOut: (root:unknown, args:unknown, { res }: { res: Response }) => {
      res.clearCookie('restaurant_token');
      return true;
    }
  }
};