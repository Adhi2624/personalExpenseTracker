import mongoose from "mongoose";
import Category from "./category";


const ExpenseSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  Category: {
    type: String,
    required: true
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
