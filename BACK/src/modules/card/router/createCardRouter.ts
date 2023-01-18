import { NextFunction, Request, Response, Router } from 'express';
import { authenticated } from '../../../config/security';
import { validate } from '../../../middlewares/validation';
import { CardRepository } from '../CardRepository';
import { CardService } from '../CardService';
import { CreateCardController } from '../controller/CreateCardController';
import { AddCardSchema } from '../dto/CardRequest';

const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const createCardController = new CreateCardController(cardService);

const router = Router();

/**
 * Rota express para adição de Card.
 */
router.post(
  '/cards',
  authenticated,
  validate(AddCardSchema),
  (request: Request, response: Response, next: NextFunction) =>
    createCardController.handler(request, response, next),
);

export default router;
