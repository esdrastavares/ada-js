import { NextFunction, Request, Response, Router } from 'express';
import { authenticated } from '../../../config/security';
import { CardRepository } from '../CardRepository';
import { CardService } from '../CardService';
import { FindAllCardController } from '../controller/FindAllCardController';

const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const findAllCardController = new FindAllCardController(cardService);

const router = Router();

/**
 * Rota express para recuperação de todos os Cards.
 */
router.get(
  '/cards',
  authenticated,
  (request: Request, response: Response, next: NextFunction) =>
    findAllCardController.handler(request, response, next),
);

export default router;
