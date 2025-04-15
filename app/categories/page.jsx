"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/category');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSort = (key, direction) => {
    const sortedCategories = [...categories].sort((a, b) => {
      if (direction === 'asc') {
        return a[key].localeCompare(b[key]);
      }
      return b[key].localeCompare(a[key]);
    });

    setCategories(sortedCategories);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`/api/category/${id}`);
        setCategories(categories.filter(c => c._id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    fetchCategories();
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="container mx-auto p-4 bg-zinc-900 min-h-screen text-zinc-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-100">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
        >
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-zinc-800 rounded-lg p-4 shadow-lg">
        <CategoryTable
          categories={categories}
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
  );
}
