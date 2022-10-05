import { Router } from "express";
const rescue = require('express-rescue')


import TeamController from "../controllers/team.controller";
import GenericController from "../controllers/generic.controller";
import JoiBodyVals from "../middlewares/JoiBodyVals";
import JoiParamVals from "../middlewares/JoiParamVals";

const teamController = new TeamController();
const joiBodyVals = new JoiBodyVals();
const joiParamVals = new JoiParamVals();
const route = Router();

// Na Collection
// Teste

route.post('/', rescue(GenericController.notAllowed))

route.get('/', rescue(teamController.findAll))

route.put('/', rescue(GenericController.notAllowed))

route.delete('/', rescue(GenericController.notAllowed))

// No Recurso

route.post('/:id', rescue(GenericController.notAllowed));

route.get('/:id', [
  joiParamVals.validateId,
  rescue(teamController.findOne)
]);

route.put('/:id', rescue(GenericController.notAllowed));

route.delete('/:id', rescue(GenericController.notAllowed));

export default route;