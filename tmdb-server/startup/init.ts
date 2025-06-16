import express from "express";
import cors from "cors";
import setupRouters from "./setupRouters";

const init = (app: express.Application) => {
  app.use(cors());
  app.use(express.json());
  setupRouters(app);
};

export default init;
