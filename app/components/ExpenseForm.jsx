import React from "react";

export default function ExpenseForm({ expenseData, setExpenseData }) {
  const handleChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="space-y-6 bg-zinc-800 p-6 rounded-lg shadow-xl">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">New Expense</h2>
      
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">Name</label>
        <input
          type="text"
          name="Name"
          value={expenseData.Name}
          onChange={handleChange}
          className="mt-1 block w-full  bg-zinc-700 border-zinc-600 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">Amount</label>
        <div className="relative mt-1  shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-zinc-400">$</span>
          </div>
          <input
            type="number"
            name="Amount"
            value={expenseData.Amount}
            onChange={handleChange}
            className="block w-full  bg-zinc-700 border-zinc-600 pl-7 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">Category</label>
        <select
          name="Category"
          value={expenseData.Category}
          onChange={handleChange}
          className="mt-1 block w-full  bg-zinc-700 border-zinc-600 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
        <textarea
          name="Description"
          value={expenseData.Description}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full  bg-zinc-700 border-zinc-600 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-1">Date</label>
        <input
          type="date"
          name="Date"
          value={expenseData.Date}
          onChange={handleChange}
          className="mt-1 block w-full  bg-zinc-700 border-zinc-600 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-zinc-800 transition-colors"
        >
          Save Expense
        </button>
      </div>
    </form>
  );
}