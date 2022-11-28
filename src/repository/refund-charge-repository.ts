import { RefundChargeEntities } from "../entities/refund-charge-entities";

export interface RefundChargeRepository {
  findCharge(payload: any): Promise<RefundChargeEntities>;
  save(charge: RefundChargeEntities): Promise<void>;
}
