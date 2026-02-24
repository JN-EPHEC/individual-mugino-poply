import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});


export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à SQLite établie.');
  } catch (error) {
    console.error(
      'Problème lors de l’établissement de la connexion à SQLite.',
      error
    );
  }
};

export default sequelize