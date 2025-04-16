"use client";
import { Wallet, TrendingUp, TrendingDown, CreditCard } from "lucide-react";
import StatisticsCard from "./StatisticsCard";

export default function SummaryCards({ transactions = [] }) {
  // Calculate total expenses for current and previous month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const formatCurrency = (value, type = null) => {
    const amount = Math.abs(value);
    const formattedValue = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

    if (type === 'income') {
      return `+${formattedValue}`;
    } else if (type === 'expense') {
      return `-${formattedValue}`;
    }
    return formattedValue;
  };

  // Calculate metrics
  const metrics = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.Date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const amount = transaction.Amount;
    const isExpense = transaction.Type === 'Expense';

    // Current month metrics
    if (month === currentMonth && year === currentYear) {
      if (isExpense) {
        acc.currentMonthExpenses += amount;
      } else {
        acc.currentMonthIncome += amount;
      }
    }
    // Last month metrics
    else if (month === lastMonth && year === lastMonthYear) {
      if (isExpense) {
        acc.lastMonthExpenses += amount;
      } else {
        acc.lastMonthIncome += amount;
      }
    }

    // Total balance
    if (isExpense) {
      acc.totalExpenses += amount;
    } else {
      acc.totalIncome += amount;
    }

    return acc;
  }, {
    currentMonthExpenses: 0,
    lastMonthExpenses: 0,
    currentMonthIncome: 0,
    lastMonthIncome: 0,
    totalIncome: 0,
    totalExpenses: 0
  });

  // Calculate trends
  const expenseTrend = {
    type: metrics.currentMonthExpenses <= metrics.lastMonthExpenses ? 'decrease' : 'increase',
    value: `${Math.abs(((metrics.currentMonthExpenses - metrics.lastMonthExpenses) / 
            (metrics.lastMonthExpenses || 1) * 100).toFixed(1))}%`
  };

  const incomeTrend = {
    type: metrics.currentMonthIncome >= metrics.lastMonthIncome ? 'increase' : 'decrease',
    value: `${Math.abs(((metrics.currentMonthIncome - metrics.lastMonthIncome) / 
            (metrics.lastMonthIncome || 1) * 100).toFixed(1))}%`
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatisticsCard
        title="Total Balance"
        value={formatCurrency(metrics.totalIncome - metrics.totalExpenses)}
        icon={Wallet}
        className="border-l-4 border-blue-500"
      />
      <StatisticsCard
        title="Monthly Income"
        value={formatCurrency(metrics.currentMonthIncome, 'income')}
        icon={TrendingUp}
        trend={incomeTrend}
        className="border-l-4 border-green-500"
      />
      <StatisticsCard
        title="Monthly Expenses"
        value={formatCurrency(metrics.currentMonthExpenses, 'expense')}
        icon={TrendingDown}
        trend={expenseTrend}
        className="border-l-4 border-red-500"
      />
      <StatisticsCard
        title="Available Budget"
        value={formatCurrency(metrics.currentMonthIncome - metrics.currentMonthExpenses)}
        icon={CreditCard}
        className="border-l-4 border-purple-500"
      />
    </div>
  );
}
