import { NextFunction, Request, Response, Router } from 'express';
import { authenticated } from '../../../config/security';
import { validate } from '../../../middlewares/validation';
import { CardRepository } from '../CardRepository';
import { CardService } from '../CardService';
import { UpdateCardController } from '../controller/UpdateCardController';
import { UpdateCardSchema } from '../dto/CardRequest';

const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const updateCardController = new UpdateCardController(cardService);

const router = Router();

/**
 * Rota express para Edição de Card.
 */
router.put(
  '/cards/:id',
  authenticated,
  validate(UpdateCardSchema),
  (request: Request, response: Response, next: NextFunction) =>
    updateCardController.handler(request, response, next),
);

export default router;
