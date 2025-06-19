import * as z from "zod";

export const productCategories = [
  "fresh-produce",
  "dairy-products",
  "bakery-and-snacks",
  "dry-food-and-staples",
  "breakfast-and-beverages",
  "baby-and-kids",
  "personal-care",
  "household-and-cleaning",
  "home-essentials",
] as const;

const MAX_FILE_SIZE = 12 * 1024 * 1024; // 12 MB in bytes

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.enum(productCategories, {
    errorMap: () => ({ message: "Invalid category selected" }),
  }),
  image: z
    .instanceof(File, { message: "Avatar must be a file" })
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Avatar must be a maximum of ${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB.`, // Dynamic message
    }),
  description: z.string().min(1, "Description is required"),
});

export const updateProductSchema = z
  .object({
    title: z.string().min(1, "Title is required").optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    category: z
      .enum(productCategories, {
        errorMap: () => ({ message: "Invalid category selected" }),
      })
      .optional(),
    image: z
      .instanceof(File, { message: "Avatar must be a file" })
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: `Avatar must be a maximum of ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB.`, // Dynamic message
      }),
    description: z.string().min(1, "Description is required").optional(),
  })
  .strict()
  .partial();
