import { Router } from "express";
import * as DevController from "../controllers/devController";
import * as LevelController from "../controllers/levelController";

const routes = Router();

//Rotas dos Desenvolvedores
routes.get("/desenvolvedores", DevController.getDev);
routes.post("/desenvolvedores", DevController.postDev);
routes.put("/desenvolvedores/:id", DevController.putDev);
routes.delete("/desenvolvedores/:id", DevController.deleteDev);

//Rotas dos Niveis
routes.get("/niveis", LevelController.getNiveis);
routes.post("/niveis", LevelController.postNiveis);
routes.put("/niveis", LevelController.putNiveis);
routes.delete("/niveis", LevelController.deleteNiveis);

export default routes;
