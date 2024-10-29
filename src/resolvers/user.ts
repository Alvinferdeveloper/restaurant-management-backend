import prisma from "../lib/prisma";
import { generateToken } from "../services/token.service";
import { authAsync, getRoles, isAuthorized } from "../utils/auth";
export const userResolvers = {
    Query: {
      users: authAsync(()=> {
        return prisma.user.findMany();
      }, ['Admin']),
    },
    Mutation: {
      userRegister:authAsync( async (root, args) => {
        const userRole = await prisma.role.findFirst({ where: { name: "USER"}});
        return prisma.user.create({ data: { roles: { connect: { id: userRole.id}}, ...args.userInput} , include:{ roles: true}});
      }, []),
      login: async (root, args, { res }) => {
        let userLogged;
        userLogged =  await prisma.user.findFirst({ where: { email: args.email, password: args.password}, include:{ roles:true}});
        if(!userLogged) userLogged = await prisma.admin.findFirst({ where: { email: args.email, password: args.password}, include:{ roles: true}});
        if(userLogged){
          const roles = userLogged.roles.map(role => role.name);
          const token = generateToken({...userLogged,roles});
          res.cookie('restaurant_token',token , { httpOnly: true, maxAge: 1000 * 60 * 60 }); 
          return userLogged;
        }
      }
    }
  };