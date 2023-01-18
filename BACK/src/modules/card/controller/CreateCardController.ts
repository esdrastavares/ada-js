import { Request, Response } from 'express';
import { BaseController } from '../../../commons/api/BaseController';
import Card from '../../../model/Card';
import { CardService } from '../CardService';

/**
 * Controller de criação de um novo {@link Card}
 */
export class CreateCardController extends BaseController {
  private cardService: CardService;

  constructor(cardService: CardService) {
    super();
    this.cardService = cardService;
  }

  async execute(request: Request, response: Response): Promise<void> {
    const cardAdded = await this.cardService.addCard(new Card(request.body));
    this.jsonCreated(response, cardAdded);
  }
}
