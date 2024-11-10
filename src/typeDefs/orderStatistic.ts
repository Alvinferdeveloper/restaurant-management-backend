export const orderStatisticsDefs = `

    type DaySale {
        day: String
        total: Float
    }
    
    type SoldFood {
        image: String
        name: String
        totalSold: Int
    }
    type OrderStatistics {
        totalSales: Float
        servedClients: Int
        foodSold: Int
        weekFoodSold: Int
        weeklySales: [DaySale]
        bestSellingFood:[SoldFood]
    }
    type Query {
        orderStatistics: OrderStatistics
    }
    
`;