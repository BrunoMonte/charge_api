import { ChargeEntities } from "../entities/charge-entities";

export interface ChargeRepository {
  findCharge(id: string): Promise<ChargeEntities>;
  save(charge: ChargeEntities): Promise<void>;
}

// class específicas para comunicar funcionalidades da aplicação com o banco de dados,
// com estruturar que vai armazenar os dados.

// Aqui contrato , os metodos que vão existir
