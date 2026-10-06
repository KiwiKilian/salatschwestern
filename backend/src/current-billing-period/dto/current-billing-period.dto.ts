import { Grocery } from "@/groceries/entities/grocery.entity";
import { Salad } from "@/salads/entities/salad.entity";

export class CurrentBillingPeriodDto {
  saladPrice?: number;

  salads: Salad[];

  groceries: Grocery[];
}
