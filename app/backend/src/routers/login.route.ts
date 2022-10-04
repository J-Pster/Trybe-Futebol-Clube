import { Router } from "express";
const rescue = require('express-rescue')


import UserController from "../controllers/user.controller";
import GenericController from "../controllers/generic.controller";
import JoiBodyVals from "../middlewares/JoiBodyVals";
import JoiParamVals from "../middlewares/JoiParamVals";

const userController = new UserController();
const joiBodyVals = new JoiBodyVals();
const joiParamVals = new JoiParamVals();
const route = Router();

// Na Collection
// Teste

route.post('/', [
  joiBodyVals.validateUser,
  rescue(userController.login)
])

route.get('/', rescue(GenericController.notAllowed))

route.put('/', rescue(GenericController.notAllowed))

route.delete('/', rescue(GenericController.notAllowed))

// No Recurso

route.post('/validate', rescue(GenericController.notAllowed));

route.get('/validate', [
  joiParamVals.validateToken,
  rescue(userController.validate)
]);

route.put('/validate', rescue(GenericController.notAllowed));

route.delete('/validate', rescue(GenericController.notAllowed));

export default route;