import { randomUUID } from "crypto";

export class ChargeEntities {
  readonly id: string; // Para não ser alterado, quando ele for setado
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

  //Quando for criar um new Charge, vai passar todas as propiedade da charge

  // id opcional, pq quando for estanciando new Charge, não vai passar o id pq nao existe ainda.
  // Porem, quando for pegar charge já salva ,e criando uma charge, para código entender essa charge já existe
  constructor(props: Omit<ChargeEntities, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = randomUUID();
    }
  }
}

// Vi nesse formato aula rocketseat, para não deixar a responsabilidade de um ID para o banco de dados.
// Como o DB é uma parte da infra da aplicação, caso dia venha alterar o DB da aplicação.
