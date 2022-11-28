import { RefundChargeServices } from "../services/refund-charge-services";
import { Request, Response } from "express";

export class RefundChargeController {
  constructor(private refundChargeService: RefundChargeServices) {}
  createRefundCharge = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { amount } = req.body;

    await this.refundChargeService.execute({ amount });

    console.log(req.body);
    return res.status(201).json(req.body);
  };
}
