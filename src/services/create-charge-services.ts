import { CreateChargeDTO } from "../dto/create-charge-dto";
import { ChargeEntities } from "../entities/charge-entities";
import { ChargeRepository } from "../repository/charge-repository";

export class ChargeGenerateService {
  constructor(private chargeRepository: ChargeRepository) {} // aplicando Liskov substitution principle.
  //Não importa qual repository vai passar pra ele, só tendo o mesmo metodo.

  // responsailidade de criar a charge
  // Não aponta de como essa charge vai ser salva.
  async execute(data: CreateChargeDTO) {
    if (!data.amount) {
      throw new Error("Incorrect ! Payload in request body, missing property.");
    }
    const existingCharge = await this.chargeRepository.findCharge(
      data.customerId
    );
    // nomeação const(moneclatura).
    if (existingCharge) {
      throw new Error(" Charge already exists");
    }

    if (data.countryCode) {
      const exist = this.paymentMethodByCountry(
        data.paymentMethod,
        data.countryCode
      );
      if (!exist) {
        throw new Error("Payment method is not allowed on this country.");
      }
    }

    const charge = new ChargeEntities(data);

    await this.chargeRepository.save(charge);
  }

  private async paymentMethodByCountry(
    paymentMethod: string,
    countryCode: string
  ): Promise<Boolean> {
    return Boolean();
  }

  private createPhonePayment(body: any, charge: CreateChargeDTO) {
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

  async createAcquirerTransaction(body: any, charge: ChargeEntities) {
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

  static getPaymentMethodByCountry(paymentMethod: string, countryCode: string) {
    const resultMethodPayment = {
      paymentMethod,
      countryCode,
    };

    return Boolean(resultMethodPayment);
  }

  async handle(body: any, charge: ChargeEntities) {
    if (body.countryCode) {
      const ifExists = ChargeGenerateService.getPaymentMethodByCountry(
        body.paymentMethod,
        body.countryCode
      );
      if (!ifExists) {
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
}
