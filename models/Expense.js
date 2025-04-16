import mongoose from "mongoose";
import Category from "./category";


const ExpenseSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    required: true,
    set: function(value) {
      // Store the absolute value, sign will be determined by category type
      return Math.abs(value);
    }
  },
  Category: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true,
    default: 'Expense',
    enum: ['Expense'], // Only allow "Expense" as a value
    immutable: true // Make the field unchangeable once set
  },
  Description: {
    type: String
  },
  Date: {
    type: Date,
    required: true
  }
});

const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

export default Expense;
