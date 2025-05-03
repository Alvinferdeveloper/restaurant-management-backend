import { decodeToken } from "../services/token.service";
import { authAsync } from "../utils/auth";
import * as userService from "../services/user.service";

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
};