"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import CategoryPieChart from "./components/CategoryPieChart";
import TransactionTable from "./components/TransactionTable";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/transactions');
        setTransactions(response.data.expenses);
        
        // Get recent transactions (last 5)
        const sortedTransactions = [...response.data.expenses]
          .sort((a, b) => new Date(b.Date) - new Date(a.Date))
          .slice(0, 5);
        setRecentTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900">
        
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900">
        
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
     
      
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-zinc-100 mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <SummaryCards transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Distribution */}
          <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
            <CategoryPieChart transactions={transactions} />
          </div>

          {/* Recent Transactions */}
          <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-zinc-100">Recent Transactions</h3>
            <TransactionTable 
              transactions={recentTransactions}
              onDelete={null}
              onEdit={null}
              onSort={null}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
