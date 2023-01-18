import Card from '../../model/Card';

/**
 * Repositório de Cards.
 */
// TODO - Criar uma interface genérica.
export class CardRepository {
  /**
   * Adiciona um novo Card
   * @param {Card} card - card para ser adicionado.
   * @returns novo card
   */
  save(card: Card): Promise<Card> {
    return card.save();
  }

  /**
   * Edita um card
   * @param {Card} card - Card para ser editado.
   * @returns Card editado
   */
  async update(card: Card): Promise<Card | null> {
    Card.upsert(card.dataValues);
    return this.findById(card.id);
  }

  /**
   * Busca um card por id
   * @param {number} id - id do card.
   * @returns card
   */
  findById(id: number): Promise<Card | null> {
    return Card.findByPk(id);
  }

  /**
   * Busca todos os Cards
   * @returns <Card[]> Cards
   */
  findAll(): Promise<Card[]> {
    return Card.findAll();
  }
}
