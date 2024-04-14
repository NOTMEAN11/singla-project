import { z } from "zod";

const schema = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.string(),
  roomTypeId: z.string().optional(),
});

export type Room = z.infer<typeof schema>;

export { schema as roomSchema };
