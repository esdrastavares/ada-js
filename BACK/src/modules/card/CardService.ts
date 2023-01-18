import { BadRequestException } from '../../commons/exception/BadRequestException';
import { NotFoundException } from '../../commons/exception/NotFoundException';
import Card from '../../model/Card';
import { CardRepository } from './CardRepository';

/**
 * Serviço do Card.
 */
// TODO - Criar CrudService genérico.
export class CardService {
  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  /**
   * Busca todos os cards
   * @returns cards
   */
  public findAll(): Promise<Card[]> {
    return this.cardRepository.findAll();
  }

  /**
   * Busca um card por id
   * @param {number} id - id do card
   * @returns card
   */
  public findById(id: number): Promise<Card | null> {
    return this.cardRepository.findById(id);
  }

  /**
   * Adiciona um novo card
   * @param {Card} card - card para ser adicionado.
   * @returns Card
   */
  public addCard(card: Card): Promise<Card> {
    return this.cardRepository.save(card);
  }

  /**
   * Edita um Card
   * @param {number} id - id do card.
   * @param {Card} card - Card para editar.
   * @returns card editado.
   * @throws {@link BadRequestException} - Quando o parametro id for diferente de card.id
   * @throws {@link NotFoundException} - Quando o card não for localizado pelo id
   */
  public async updateCard(id: number, card: Card): Promise<Card | null> {
    if (id !== card.id) {
      throw new BadRequestException();
    }

    const cardFound = await this.findById(id);

    if (!cardFound) {
      throw new NotFoundException();
    }

    return this.cardRepository.update(card);
  }

  /**
   * Remove um Card
   * @param {number} id - id do card
   * @returns todos os cards
   * @throws {@link NotFoundException} - Quando o card não for localizado pelo id
   */
  public async deleteCard(id: number): Promise<Card[]> {
    const cardFound = await this.findById(id);

    if (!cardFound) {
      throw new NotFoundException();
    }

    cardFound.destroy();

    return this.findAll();
  }
}
