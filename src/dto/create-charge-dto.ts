export interface CreateChargeDTO {
  //readonly id: string;
  amount: number;
  paymentMethod: string;
  recipientId: string;
  status: string;
  transactionReferenceId: string;
  paymentProfileId: string;
  customerId: string;
  installments: number;
  countryCode: string;
  originId: string;
  originType: string;
}

// transferindo um objeto de uma camada para outra

// ex: Camada controller onde bate requisição do usuario, e se comunica com camada de dominio.
// sabendo os dados que vão ser trasmitido de uma camada para outra.
