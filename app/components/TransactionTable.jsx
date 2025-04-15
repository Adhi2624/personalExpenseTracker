import { useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function TransactionTable({ 
  transactions = [], 
  onDelete, 
  onEdit,
  onSort 
}) {
  const [sortConfig, setSortConfig] = useState({ key: 'Date', direction: 'desc' });

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`/api/transactions/${id}`);
        onDelete?.(id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table aria-label="Transactions table">
        <TableHeader>
          <TableColumn 
            className="cursor-pointer" 
            onClick={() => handleSort('Date')}
          >
            Date {getSortIcon('Date')}
          </TableColumn>
          <TableColumn 
            className="cursor-pointer" 
            onClick={() => handleSort('Name')}
          >
            Name {getSortIcon('Name')}
          </TableColumn>
          <TableColumn 
            className="cursor-pointer" 
            onClick={() => handleSort('Amount')}
          >
            Amount {getSortIcon('Amount')}
          </TableColumn>
          <TableColumn 
            className="cursor-pointer" 
            onClick={() => handleSort('Category')}
          >
            Category {getSortIcon('Category')}
          </TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{formatDate(transaction.Date)}</TableCell>
                <TableCell>{transaction.Name}</TableCell>
                <TableCell>{formatAmount(transaction.Amount)}</TableCell>
                <TableCell>{transaction.Category}</TableCell>
                <TableCell>{transaction.Description || '-'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(transaction)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
