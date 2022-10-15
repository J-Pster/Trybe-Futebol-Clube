import { Router } from "express";
const rescue = require('express-rescue')


import LeaderboardController from "../controllers/leader.controller";
import GenericController from "../controllers/generic.controller";

const leaderboardController = new LeaderboardController();
const route = Router();

// Na Collection
// Teste

route.post('/', rescue(GenericController.notAllowed))

route.get('/', rescue(leaderboardController.getAll))

route.put('/', rescue(GenericController.notAllowed))

route.delete('/', rescue(GenericController.notAllowed))

// No Recurso Home

route.post('/home', rescue(GenericController.notAllowed));

route.get('/home', rescue(leaderboardController.getHome));

route.put('/home', rescue(GenericController.notAllowed));

route.delete('/home', rescue(GenericController.notAllowed));

// No Recurso Away

route.post('/away', rescue(GenericController.notAllowed));

route.get('/away', rescue(leaderboardController.getAway));

route.put('/away', rescue(GenericController.notAllowed));

route.delete('/away', rescue(GenericController.notAllowed));

export default route;