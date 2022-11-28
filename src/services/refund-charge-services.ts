import { CreateRefundChargeDTO } from "../dto/create-refund-charge-dto";
import { RefundChargeEntities } from "../entities/refund-charge-entities";
import { RefundChargeRepository } from "../repository/refund-charge-repository";

export interface TransactionRefundResponse {
  id: string;
  status: string;
  chargeId: string;
}

export class RefundChargeServices {
  constructor(private refundChargeRepository: RefundChargeRepository) {}

  async execute(data: CreateRefundChargeDTO) {
    const refundCharge = new RefundChargeEntities(data);
    //const charge = { status:  };
    await this.refundChargeRepository.save(refundCharge);

    if (!data) {
      throw new Error("Charge not found");
    }

    /*if (charge.status !== "COMPLETED_SUCCESSFULLY") {
      throw new Error("Status not allowed");
    }*/

    if (data.amount && data.amount > refundCharge.amount) {
      throw new Error("Amount entered greater than the amount charged.");
    }
  }
}
