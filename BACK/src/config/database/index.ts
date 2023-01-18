import { Sequelize } from 'sequelize';

/**
 * Configuração do sequelize {@link https://sequelize.org}
 */
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

export default sequelize;
