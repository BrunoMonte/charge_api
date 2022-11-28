import { randomUUID } from "crypto";

export class RefundChargeEntities {
  readonly id: string;
  amount: number;

  constructor(props: Omit<RefundChargeEntities, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = randomUUID();
    }
  }
}
