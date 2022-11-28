import { ChargeGenerateService } from "../services/create-charge-services";
import { Request, Response } from "express";

export class ChargeController {
  constructor(private createChargeService: ChargeGenerateService) {}

  async createCharge(req: Request, res: Response) {
    const {
      amount,
      paymentMethod,
      recipientId,
      status,
      transactionReferenceId,
      paymentProfileId,
      customerId,
      installments,
      countryCode,
      originId,
      originType,
    } = req.body;

    await this.createChargeService.execute({
      amount,
      paymentMethod,
      recipientId,
      status,
      transactionReferenceId,
      paymentProfileId,
      customerId,
      installments,
      countryCode,
      originId,
      originType,
    });

    console.log(req.body);

    return res.status(201).json(req.body);
  }
}
