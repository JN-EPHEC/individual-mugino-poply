import express, {Application, Request, Response} from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import { initDatabase } from './config/database';
import User from './models/User';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startServer = async () => {
    await initDatabase(); // On vérifie la connexion avec la DB

    await sequelize.sync({ alter: true });  // On synchronise les modèles
    console.log('Tous les modèles synchronisés avec la base de données.');

    const app: Application = express(); // Config express

    app.use(express.static(path.join(__dirname, '../public')))  // middleware qui permet d'utiliser un dossier statique

    app.use(express.json()); // important: middleware qui parse le json automatiquement

    app.use('/', userRoutes); // on monte à la racine

    const port = 3000; // Config port

    app.listen(port, () => {
        console.log(`Serveur lancé sur http://localhost:${port}`)
    });
};

startServer().catch((err) => {
  console.error('Erreur au démarrage du serveur :', err);
  process.exit(1);
});