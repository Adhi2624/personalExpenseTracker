import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    enum: ['Expense', 'Income'],
    required: true
  }
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
