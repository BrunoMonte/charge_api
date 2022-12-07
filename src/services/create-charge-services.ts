import { CreateChargeDTO } from "../dto/create-charge-dto";
import { ChargeEntities } from "../entities/charge-entities";
import { ChargeRepository } from "../repository/charge-repository";

export class ChargeGenerateService {
  static paymentMethodByCountry: any;
  constructor(private chargeRepository: ChargeRepository) {} // aplicando Liskov substitution principle.
  //Não importa qual repository vai passar pra ele, só tendo o mesmo metodo.

  // responsailidade de criar a charge
  // Não aponta de como essa charge vai ser salva.
  async handle(body: any, charge: ChargeEntities) {
    if (body.countryCode) {
      const exists = ChargeGenerateService.paymentMethodByCountry(
        body.paymentMethod,
        body.countryCode
      );
      if (!exists) {
        throw new Error();
      }
    }

    const charges = await new ChargeGenerateService(this.chargeRepository)
      .execute;

    let transaction;

    if (body.paymentMethod === "PHONE_PAYMENT") {
      transaction = await this.createPhonePayment(charges, body);
    } else if (
      body.paymentMethod === "CREDIT_CARD" ||
      body.paymentMethod === "CARD_PAYMENT"
    ) {
      transaction = await this.createAcquirerTransaction(charges, body);
    } else {
      throw new Error("Payment method not specified.");
    }
  }

  async createAcquirerTransaction(
    body: any,
    charge: ChargeEntities
  ): Promise<any> {
    const responseAcquirerTransaction = {
      recipientId: body.recipientId,
      customerId: body.customerId,
      installments: body.data.installments,
      countryCode: body.countryCode || "BRA",
      currency: body.data.currency ?? "BRL",
      acquirerPartner: body.data.acquirerPartner,
      paymentProfileId: body.data.paymentProfileId,
      amount: body.amount,
      chargeId: charge.id,
      ...body.data,
    };

    return responseAcquirerTransaction.data;
  }

  private createPhonePayment(body: any, charge: ChargeEntities): Promise<any> {
    const responsePaymentTransaction = {
      amount: body.amount,
      recipientId: body.recipientId,
      countryCode: body.countryCode,
      customerId: body.customerId,
      paymentProfileId: body.data.paymentProfileId,
      ...body.data,
    };

    return responsePaymentTransaction.data;
  }

  private async paymentMethodByCountry(
    paymentMethod: string,
    countryCode: string
  ): Promise<Boolean> {
    return Boolean();
  }

  async execute(body: any) {
    if (!body.amount) {
      throw new Error("Incorrect ! Payload in request body, missing property.");
    }
    const existingCharge = await this.chargeRepository.findCharge(
      body.customerId
    );
    // nomeação const(moneclatura).
    if (existingCharge) {
      throw new Error(" Charge already exists");
    }

    if (body.countryCode) {
      const exist = this.paymentMethodByCountry(
        body.paymentMethod,
        body.countryCode
      );
      if (!exist) {
        throw new Error("Payment method is not allowed on this country.");
      }
    }

    const charge = new ChargeEntities(body);

    await this.chargeRepository.save(charge);
  }
}
