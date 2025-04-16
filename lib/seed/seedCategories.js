import dbConnect from "../db";
import Category from "@/models/category";
import { defaultCategories } from "./defaultCategories";

export async function seedCategories() {
  try {
    await dbConnect();
    
    // Check if default categories already exist
    const existingDefaults = await Category.find({ isDefault: true });
    if (existingDefaults.length > 0) {
      console.log('Default categories already seeded');
      return;
    }

    // Insert default categories
    await Category.insertMany(defaultCategories);
    console.log('Successfully seeded default categories');
  } catch (error) {
    console.error('Error seeding default categories:', error);
  }
}
