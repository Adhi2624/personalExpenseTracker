"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Fetch transactions and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, categoriesRes] = await Promise.all([
          axios.get('/api/transactions'),
          axios.get('/api/category')
        ]);
        
        setTransactions(transactionsRes.data.expenses);
        setCategories(categoriesRes.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key, direction) => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (key === 'Date') {
        return direction === 'asc' 
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      
      if (key === 'Amount') {
        return direction === 'asc' 
          ? a[key] - b[key]
          : b[key] - a[key];
      }
      
      return direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });

    setTransactions(sortedTransactions);
  };

  const handleDelete = (deletedId) => {
    setTransactions(transactions.filter(t => t._id !== deletedId));
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSuccess = async () => {
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data.expenses);
      setIsModalOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error refreshing transactions:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-900 min-h-screen text-zinc-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-100">Transactions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
        >
          Add Transaction
        </button>
      </div>

      {/* Chart Section */}
      <div className="bg-zinc-800 rounded-lg p-4 shadow-lg mb-6">
        <MonthlyExpenseChart transactions={transactions} />
      </div>

      {/* Transactions Table */}
      <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
        <TransactionTable
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onSort={handleSort}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-zinc-900 bg-opacity-75 flex items-center justify-center">
          <div className="relative bg-zinc-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-zinc-100">
                {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTransaction(null);
                }}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <TransactionForm
              initialData={editingTransaction}
              categories={categories}
              onSuccess={handleSuccess}
              closeModal={() => {
                setIsModalOpen(false);
                setEditingTransaction(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
