import { z } from "zod";

export const productValidationSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  name: z.string().min(2).trim(),
  description: z.string().min(2).trim(),
  barcode: z.string().min(2).trim(),
  tags: z.array(z.string().uuid()),
  quantity: z.number().int().positive(),
  minimumQuantity: z.number().int().positive().optional(),
  prefferedQuantity: z.number().int().positive().optional(),
  warehouseId: z.string().uuid(),
});

export type Product = z.infer<typeof productValidationSchema>;
