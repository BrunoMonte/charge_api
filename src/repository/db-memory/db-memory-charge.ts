import { ChargeEntities } from "../../entities/charge-entities";
import { ChargeRepository } from "../charge-repository";

export class MemoryChargeRepository implements ChargeRepository {
  chargesMemory: ChargeEntities[] = []; // salvando as charges numa variavel privada

  async findCharge(id: string): Promise<ChargeEntities> {
    const charge = this.chargesMemory.find((charge) => charge.id === id);
    //find pelo id se existe uma charge, que esta sendo passado como parametro

    return charge;
  }

  async save(charge: ChargeEntities): Promise<void> {
    this.chargesMemory.push(charge);
  }
}

// ajuste sintaxe
// padronização
