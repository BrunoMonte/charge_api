import { Router } from "express";
import { ChargeController } from "./controllers/create-charge-controller";
import { RefundChargeController } from "./controllers/refund-charge-controller";
import { MemoryChargeRepository } from "./repository/db-memory/db-memory-charge";
import { MemoryRefundChargeRepository } from "./repository/db-memory/db-memory-refund-charge ";
import { ChargeGenerateService } from "./services/create-charge-services";
import { RefundChargeServices } from "./services/refund-charge-services";

const router = Router();

router.post("/charges", (request, response) => {
  const memoryChargeRepository = new MemoryChargeRepository();
  const createChargeService = new ChargeGenerateService(memoryChargeRepository);
  const createChargeController = new ChargeController(createChargeService);

  return createChargeController.createCharge(request, response);
});

router.post("/charges/refund", (request, response) => {
  const memoryChargeRefundRepository = new MemoryRefundChargeRepository();

  const createRefundChargeService = new RefundChargeServices(
    memoryChargeRefundRepository
  );
  const createRefundChargeController = new RefundChargeController(
    createRefundChargeService
  );

  return createRefundChargeController.createRefundCharge(request, response);
});

export { router };
