import { RefundChargeEntities } from "../../entities/refund-charge-entities";
import { RefundChargeRepository } from "../refund-charge-repository";

export class MemoryRefundChargeRepository implements RefundChargeRepository {
  refundChargesMemory: RefundChargeEntities[] = [];

  async findCharge(id: string): Promise<RefundChargeEntities> {
    const charge = this.refundChargesMemory.find((charge) => charge.id === id);

    return charge;
  }

  async save(charge: RefundChargeEntities): Promise<void> {
    this.refundChargesMemory.push(charge);
  }
}
