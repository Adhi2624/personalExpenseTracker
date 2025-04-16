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
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#808080' // Default gray color
  },
  icon: {
    type: String,
    default: 'circle' // Default icon name
  }
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;
