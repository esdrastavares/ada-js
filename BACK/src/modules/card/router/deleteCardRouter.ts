import { NextFunction, Request, Response, Router } from 'express';
import { authenticated } from '../../../config/security';
import { CardRepository } from '../CardRepository';
import { CardService } from '../CardService';
import { DeleteCardController } from '../controller/DeleteCardController';

const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const deleteCardController = new DeleteCardController(cardService);

const router = Router();

/**
 * Rota express para remoção de Card.
 */
router.delete(
  '/cards/:id',
  authenticated,
  (request: Request, response: Response, next: NextFunction) =>
    deleteCardController.handler(request, response, next),
);

export default router;
