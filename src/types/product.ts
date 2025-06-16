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

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.enum(productCategories, {
    errorMap: () => ({ message: "Invalid category selected" }),
  }),
  image: z.instanceof(File, { message: "Image must be a file" }),
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
    image: z.instanceof(File, { message: "Image must be a file" }).optional(),
    description: z.string().min(1, "Description is required").optional(),
  })
  .strict()
  .partial();
