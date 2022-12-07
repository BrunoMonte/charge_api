import express from "express";
import { AppDataSource } from "./data-source";
import { router } from "./routes";

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(router);

  app.listen(process.env.PORT_APPLICATION);
});

//export { app };
