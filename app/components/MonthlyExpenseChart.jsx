import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { format, parseISO, startOfMonth } from "date-fns";

export default function MonthlyExpenseChart({ transactions = [] }) {
  // Process transactions to get monthly totals
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = parseISO(transaction.Date);
    const monthKey = startOfMonth(date).toISOString();
    const amount = transaction.Amount;
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: format(date, 'MMM yyyy'),
        expenses: 0
      };
    }
    
    acc[monthKey].expenses += amount;
    
    return acc;
  }, {});

  // Convert to array and sort by date
  const chartData = Object.values(monthlyData)
    .sort((a, b) => new Date(a.month) - new Date(b.month))
    .slice(-6); // Show last 6 months

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  return (
    <div className="w-full h-[300px] mt-4">
      <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month"
            tick={{ fill: '#888888' }}
          />
          <YAxis 
            tick={{ fill: '#888888' }}
            tickFormatter={formatCurrency}
          />
          <Tooltip 
            formatter={(value) => [formatCurrency(value), "Expenses"]}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '4px',
              color: '#ffffff'
            }}
          />
          <Bar 
            dataKey="expenses" 
            fill="#ef4444" 
            radius={[4, 4, 0, 0]}
            name="Expenses"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
