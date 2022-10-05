import { Router } from "express";
const rescue = require('express-rescue')


import MatchController from '../controllers/match.controller';
import GenericController from "../controllers/generic.controller";
import JoiBodyVals from "../middlewares/JoiBodyVals";
import JoiParamVals from "../middlewares/JoiParamVals";

const matchController = new MatchController();
const joiBodyVals = new JoiBodyVals();
const joiParamVals = new JoiParamVals();
const route = Router();

// Na Collection

route.post('/', [
  joiParamVals.validateToken,
  joiBodyVals.validateMatchBody,
  joiBodyVals.validateTeamIds,
  rescue(matchController.create)
])

route.get('/', [
  joiParamVals.validateMatchParams,
  rescue(matchController.findAll),
])

route.put('/', rescue(GenericController.notAllowed))

route.delete('/', rescue(GenericController.notAllowed))

// No Recurso

route.post('/:id', rescue(GenericController.notAllowed));

route.get('/:id',  rescue(GenericController.notAllowed));

route.put('/:id', rescue(GenericController.notAllowed));

route.delete('/:id', rescue(GenericController.notAllowed));

route.patch('/:id', [
  joiParamVals.validateToken,
  joiParamVals.validateId,
  rescue(matchController.updateScore)
]);

// No Recurso com função especial

route.patch('/:id/finish', [
  joiParamVals.validateToken,
  joiParamVals.validateId,
  rescue(matchController.finish)
]);


export default route;