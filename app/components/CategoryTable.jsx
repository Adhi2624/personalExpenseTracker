"use client";
import { Pencil, Trash2, Lock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Helper function to determine if text should be black or white based on background color
function getContrastColor(hexColor) {
  if (!hexColor) return '#ffffff'; // Default to white text if no color provided

  try {
    // Remove the # if present
    const hex = hexColor.replace('#', '');
    
    // Validate hex format
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return '#ffffff';
    }
    
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance using the WCAG formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light backgrounds and white for dark backgrounds
    return luminance > 0.5 ? '#000000' : '#ffffff';
  } catch (error) {
    return '#ffffff'; // Default to white text if any error occurs
  }
}

export default function CategoryTable({ categories = [], onDelete, onEdit }) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-4 text-zinc-400">
        No categories found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category._id}>
            <TableCell className="font-medium flex items-center gap-2">
              {/* Display color dot */}
              <span
                className="inline-block w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color || '#808080' }}
              />
              {category.Name}
              {category.isDefault && (
                <Lock className="w-4 h-4 text-zinc-500" />
              )}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  category.Type === 'Income'
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                {category.Type}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded font-mono text-sm"
                  style={{
                    backgroundColor: category.color || '#808080',
                    color: getContrastColor(category.color || '#808080')
                  }}
                >
                  {category.color || '#808080'}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {!category.isDefault && onEdit && (
                  <button
                    onClick={() => onEdit(category)}
                    className="p-1 hover:bg-zinc-700 rounded-md transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-zinc-400" />
                  </button>
                )}
                {!category.isDefault && onDelete && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this category?')) {
                        onDelete(category._id);
                      }
                    }}
                    className="p-1 hover:bg-zinc-700 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                )}
                {category.isDefault && (
                  <span className="text-sm text-zinc-500">
                    Default category
                  </span>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
