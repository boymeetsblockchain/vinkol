import { productCategories } from "@/lib/constants";
import * as z from "zod";

// export const productCategories = [
//   "fresh-produce",
//   "dairy-products",
//   "bakery-and-snacks",
//   "dry-food-and-staples",
//   "breakfast-and-beverages",
//   "baby-and-kids",
//   "personal-care",
//   "household-and-cleaning",
//   "home-essentials",
//   "others",
// ] as const;

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

const categoryEnum = z.enum(
  productCategories.map((c) => c.value) as [string, ...string[]],
  {
    errorMap: () => ({ message: "Invalid category selected" }),
  }
);

export const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be a positive number"),
  category: categoryEnum,
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
    category: categoryEnum.optional(),
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
