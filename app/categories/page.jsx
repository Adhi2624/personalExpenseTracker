"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/category/${id}`);
      setCategories(categories.filter(category => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. It may be in use by transactions.');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSuccess = async () => {
    try {
      const response = await axios.get('/api/category');
      setCategories(response.data.categories);
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Error refreshing categories:', error);
      setError('Failed to update categories. Please try again later.');
    }
  };

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

  // Separate default and custom categories
  const defaultCategories = categories.filter(cat => cat.isDefault);
  const customCategories = categories.filter(cat => !cat.isDefault);

  return (
    <div className="min-h-screen bg-zinc-900">
     
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-zinc-100">Categories</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
          >
            Add Category
          </button>
        </div>

        {/* Default Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">Default Categories</h2>
          <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
            <CategoryTable
              categories={defaultCategories}
              onDelete={null} // Prevent deletion of default categories
              onEdit={null}  // Prevent editing of default categories
            />
          </div>
        </div>

        {/* Custom Categories */}
        <div>
          <h2 className="text-xl font-semibold text-zinc-100 mb-4">Custom Categories</h2>
          <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
            <CategoryTable
              categories={customCategories}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-zinc-900 bg-opacity-75 flex items-center justify-center">
            <div className="relative bg-zinc-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-zinc-100">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h3>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
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

              <CategoryForm
                initialData={editingCategory}
                onSuccess={handleSuccess}
                closeModal={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
