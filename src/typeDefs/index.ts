import { adminDefs } from "./admin";
import { foodDefs } from "./food";
import { foodOrderDefs } from "./foodOrder";
import { orderDefs } from "./order";
import { roleDef } from "./role";
import { tableDefs } from "./table";
import { userDefs } from "./user";
import { signedUrlDefs } from "./signedUrl";
import { orderStatisticsDefs } from "./orderStatistic";

export default [adminDefs, userDefs,foodDefs, tableDefs,orderDefs,foodOrderDefs, orderStatisticsDefs , roleDef,signedUrlDefs].join(' \n ');