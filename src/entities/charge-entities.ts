import { randomUUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("charges")
export class ChargeEntities {
  @PrimaryGeneratedColumn()
  readonly id: string; // Para não ser alterado, quando ele for setado

  @Column()
  amount: number;

  @Column()
  paymentMethod: string;

  @Column()
  recipientId: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  transactionReferenceId: string;

  @Column({ type: "uuid" })
  paymentProfileId: string;

  @Column({ type: "uuid" })
  customerId: string;

  @Column({ default: 0 })
  installments: number;

  @Column({ type: "text" })
  countryCode: string;

  @Column({ type: "uuid" })
  originId: string;

  @Column()
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
