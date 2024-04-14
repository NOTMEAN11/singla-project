import { z } from "zod";

const schema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  capacity: z.number(),
  image: z.string().array(),
  slug: z.string(),
});

export type RoomType = z.infer<typeof schema>;

export { schema as roomTypeSchema };
