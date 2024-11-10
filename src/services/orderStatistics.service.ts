import prisma from "../lib/prisma";
import { startOfWeek, endOfWeek } from 'date-fns'

const today = new Date();
today.setHours(0, 0, 0, 0);

const lastHour = new Date(today.getTime() + 24 * 60 * 60 * 1000);

export async function getTotalSales() {
    const orderDoc = await prisma.order.aggregate({ _sum: { total: true }, where: { date: { gte: today, lt: lastHour } } });
    return orderDoc._sum.total || 0;
}

export async function getServedClients() {
    const servedClients = await prisma.order.groupBy({ by: ['user_id'], where: { date: { gte: today, lt: lastHour } } });
    return servedClients.length;
}

export async function getFoodSold() {
    const foodSold = await prisma.food_Order.findMany({
        distinct: ['food_Id'],
        where: {
            date: { gte: today, lt: lastHour }
        },
        select: {
            food_Id: true,
        },
    });
    return foodSold.length
}

export async function getWeeklySales() {
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const sales = await prisma.order.findMany({
        where: {
            date: {
                gte: start,
                lte: end,
            },
        },
    });
    const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const salesByDayOfWeek = daysOfWeek.reduce((acc, day) => {
        acc[day] = 0;
        return acc;
    }, {} as Record<string, number>);
    sales.forEach(sale => {
        const dayName = daysOfWeek[new Date(sale.date).getDay() - 1]; // Ajusta para que lunes sea el primer día
        salesByDayOfWeek[dayName] += sale.total; // Suma las ventas para ese día
    });
    const result = daysOfWeek.map(day => ({
        day,
        total: salesByDayOfWeek[day],
    }));

    return result;
}

export async function getBestSellingFood() {
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const foodsOrdersDoc = await prisma.food_Order.groupBy({
        by: ['food_Id'],
        where: {
            date: {
                gte: start,
                lte: end,
            },
        },
        _sum: {
            amount: true,
        },
        orderBy: {
            _sum: {
                amount: 'desc',
            },
        },
        take: 4,
    });
    const foodIds = foodsOrdersDoc.map(item => item.food_Id); 

    const foodDetails = await prisma.food.findMany({
        where: {
            id: {
                in: foodIds,
            },
        },
    });

    const result = foodsOrdersDoc.map(item => {
        const food = foodDetails.find(food => food.id === item.food_Id); 
        return {
            image: food.image,
            name: food.name, 
            totalSold: item._sum.amount,
        };
    });

    return result;
}

export async function getWeekFoodSold(){
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const foodOrderDoc = await prisma.food_Order.aggregate({
        _sum:{
            amount: true
        },
        where:{
            date: {
                gte: start,
                lte: end
            }
        }
    });
    return foodOrderDoc._sum.amount;
}