import { GraphQLError } from "graphql";
import prisma from "../lib/prisma";
import { decodeToken, generateToken } from "../services/token.service";
import { authAsync } from "../utils/auth";
import bcript from 'bcrypt'
export const userResolvers = {
    Query: {
      users: authAsync(()=> {
        return prisma.user.findMany();
      }, ['ADMIN']),
      user: authAsync((root, args, token)=> {
        const user = decodeToken(token);
        return { id: user.id, name: user.name, roles: user.roles };
      },[])
    },
    Mutation: {
      userRegister:async (root, args, { res}) => {
        const userRole = await prisma.role.findFirst({ where: { name: "USER"}});
        const email = await prisma.user.findFirst({ where: { email: args.userInput.email}});
        if( email ) throw new GraphQLError('EMAIL_EXISTS');
        const hashedPassword = bcript.hashSync(args.userInput.password, 10);
        const user = await prisma.user.create({ data: { roles: { connect: { id: userRole.id}},...args.userInput, password: hashedPassword} , include:{ roles: true}});
        const roles = user.roles.map(role => role.name);
        const token = generateToken({...user,roles})
        res.cookie('restaurant_token',token , { httpOnly: true, maxAge: 1000 * 60 * 60 }); 
        return user;
      },
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
      },
      logOut: (root, args, { res })=>{
        res.clearCookie('restaurant_token');
        return true;
      }
    }
  };