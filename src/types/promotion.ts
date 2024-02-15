import { z } from "zod";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  content: z.string(),
  slug: z.string(),
});

const couponSchema = z.object({
  id: z.string(),
  code: z.string(),
  discount: z.number(),
  description: z.string(),
  total: z.number(),
  endDate: z.string(),
});

export type Promotion = z.infer<typeof schema>;
export type Coupon = z.infer<typeof couponSchema>;
export { schema as promotionSchema, couponSchema };
