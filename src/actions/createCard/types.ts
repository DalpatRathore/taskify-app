import { z } from "zod";

import { Card } from "@prisma/client";
import { ActionState } from "@/lib/createSafeAction";

import { CreateCard } from "./schema";
export type InputType = z.infer<typeof CreateCard>;
export type ReturnTypeType = ActionState<InputType, Card>;
