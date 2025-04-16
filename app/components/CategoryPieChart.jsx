"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function CategoryPieChart({ transactions = [] }) {
  // Process transactions to get category totals
  const categoryTotals = transactions.reduce((acc, transaction) => {
    const { Category, Amount } = transaction;
    if (!acc[Category]) {
      acc[Category] = 0;
    }
    acc[Category] += Amount;
    return acc;
  }, {});

  // Convert to array format for Recharts
  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  // Sort data by value in descending order
  chartData.sort((a, b) => b.value - a.value);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Get unique category colors from the backend
  const getColorForCategory = (category) => {
    // This will be replaced with actual category colors from the database
    const colors = {
      Housing: "#FF5733",
      Transportation: "#33FF57",
      "Food & Dining": "#3357FF",
      Utilities: "#FF33F6",
      Healthcare: "#FF6B6B",
      Entertainment: "#4ECDC4",
      Shopping: "#45B7D1",
      Education: "#96CEB4",
      Salary: "#33FFF6",
      Investments: "#2ECC71",
      Freelance: "#F1C40F",
      Gifts: "#E67E22"
    };
    return colors[category] || "#808080"; // Return gray for unknown categories
  };

  return (
    <div className="w-full h-[400px] mt-4">
      <h3 className="text-lg font-semibold mb-4">Expense Distribution by Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColorForCategory(entry.name)}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '4px',
              color: '#ffffff'
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            formatter={(value, entry) => `${value} (${formatCurrency(entry.payload.value)})`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
