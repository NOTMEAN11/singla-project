import { z } from "zod";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const adminType = typeof schema;

export { schema as adminSchema, adminType };
