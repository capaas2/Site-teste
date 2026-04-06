import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string()
    .email("E-mail inválido. Por favor, confira o que foi digitado.")
    .min(5, "O e-mail é muito curto.")
    .max(255, "O e-mail é muito longo.")
    .trim()
    .toLowerCase()
});

export type SubscribeData = z.infer<typeof subscribeSchema>;
