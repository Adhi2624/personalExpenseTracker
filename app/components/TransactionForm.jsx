import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TransactionForm({ 
  onSuccess, 
  initialData = null,
  categories = [],
  closeModal 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: initialData || {
      Name: "",
      Amount: "",
      Category: "",
      Description: "",
      Date: new Date().toISOString().split('T')[0],
      Type: "Expense" // Always set as Expense
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      // Format amount to number and handle date
      const formattedData = {
        ...data,
        Amount: parseFloat(data.Amount),
        Date: new Date(data.Date),
        Type: "Expense" // Force type as Expense
      };

      if (initialData?._id) {
        await axios.put(`/api/transactions/${initialData._id}`, formattedData);
      } else {
        await axios.post('/api/transactions', formattedData);
      }

      form.reset();
      onSuccess?.();
      closeModal?.();
    } catch (error) {
      console.error('Transaction save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Transaction name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Amount"
          rules={{ 
            required: "Amount is required",
            pattern: {
              value: /^[0-9]*\.?[0-9]+$/,
              message: "Please enter a valid number"
            }
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (₹)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Category"
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category.Name}>
                      {category.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Optional description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Date"
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => closeModal?.()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
