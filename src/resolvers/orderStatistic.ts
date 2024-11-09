import { getTotalSales, getServedClients, getFoodSold, getWeeklySales, getBestSellingFood } from "../services/orderStatistics.service";
import { authAsync } from "../utils/auth";
export const orderStatisticsResolvers = {
  Query: {
    orderStatistics: authAsync(async() => {
      const totalSales = await getTotalSales();
      const servedClients = await getServedClients();
      const foodSold = await getFoodSold();
      const weeklySales = await getWeeklySales();
      const bestSellingFood = await getBestSellingFood();
      return { totalSales, servedClients, foodSold, weeklySales, bestSellingFood };
    },[]),
  },
};