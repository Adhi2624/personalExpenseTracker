import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

// Utility function for calculating contrast color
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Palette } from "lucide-react";

const DEFAULT_COLORS = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33F6",
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#33FFF6", "#2ECC71", "#F1C40F", "#E67E22"
];

export default function CategoryForm({ 
  onSuccess, 
  initialData = null,
  closeModal 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);

  // Handle click outside of color picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Form validation schema
  const formSchema = z.object({
    Name: z.string().min(1, "Name is required"),
    Type: z.enum(["Expense", "Income"], {
      required_error: "Type is required",
    }),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"),
    isDefault: z.boolean().default(false),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      Name: "",
      Type: "",
      color: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
      isDefault: false
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      if (initialData?._id) {
        await axios.put(`/api/category/${initialData._id}`, data);
      } else {
        await axios.post('/api/category', data);
      }

      form.reset();
      onSuccess?.();
      closeModal?.();
    } catch (error) {
      console.error('Category save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Color Picker */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Color
              </FormLabel>
              <FormControl>
                <div className="relative" ref={colorPickerRef}>
                  <div
                    className="w-full h-10 rounded-md cursor-pointer border border-input flex items-center px-3 py-2"
                    style={{ backgroundColor: field.value || '#808080' }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    <span className="text-sm font-mono" style={{ color: getContrastColor(field.value || '#808080') }}>
                      {field.value || '#808080'}
                    </span>
                  </div>
                  {showColorPicker && (
                    <div className="absolute z-50 mt-2 p-2 bg-zinc-800 rounded-md shadow-lg grid grid-cols-6 gap-2">
                      {DEFAULT_COLORS.map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-md cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            field.onChange(color);
                            setShowColorPicker(false);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Name"
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Type"
          rules={{ required: "Type is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Expense">Expense</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                </SelectContent>
              </Select>
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
