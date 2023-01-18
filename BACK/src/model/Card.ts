import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

/**
 * Model que representa um Card.
 */
class Card extends Model {
  declare id: number;
  declare titulo: string;
  declare conteudo: string;
  declare lista: string;
}

/**
 * Declação das propriedades da tabela.
 */
Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lista: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize },
);

/**
 * Não utilizei migration pelo tempo... sorry :(
 */
(async () => {
  await sequelize.sync();
})();

export default Card;
