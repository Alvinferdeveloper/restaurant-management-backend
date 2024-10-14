import { adminDefs } from "./admin";
import { foodDefs } from "./food";
import { foodOrderDefs } from "./foodOrder";
import { orderDefs } from "./order";
import { roleDef } from "./role";
import { tableDefs } from "./table";
import { userDefs } from "./user";

export default [adminDefs, userDefs,foodDefs, tableDefs,orderDefs,foodOrderDefs, , roleDef, , ].join(' \n ');