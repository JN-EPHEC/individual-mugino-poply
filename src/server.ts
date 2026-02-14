import express, {Application, Request, Response} from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import { initDatabase } from './config/database';
import User from './models/User';

const startServer = async () => {
    await initDatabase(); // On vérifie la connexion avec la DB

    await sequelize.sync({ alter: true });  // On synchronise les modèles
    console.log('Tous les modèles synchronisés avec la base de données.');

    const app: Application = express(); // Config express


    app.use(express.json()); // important

    app.use('/', userRoutes); // on monte à la racine

    // Route racine
    app.get('/', (req: Request, res: Response) => {
        res.send('Bienvenue sur mon serveur API');
    });

    // Route /api/data
    app.get('/api/data', (req: Request, res: Response) => {
        const etudiants = [
            { id: 1, nom: "Dupont", prenom: "Jean" },
            { id: 2, nom: "Martin", prenom: "Sophie" },
            { id: 1, nom: "Doe", prenom: "John" },        
        ];
        res.json(etudiants);
    });

    // Route /api/hello/nom_dynamique
    app.get('/api/hello/:name', (req: Request, res: Response) => {
        const timestamp = new Date();
        const nom = req.params.name;
        const reponse = {
            "message": `Bonjour ${nom}`,
            "timestamp": timestamp
        };
        res.json(reponse);
    });

    const port = 3000; // Config port

    app.listen(port, () => {
        console.log(`Serveur lancé sur http://localhost:${port}`)
    });
};

startServer().catch((err) => {
  console.error('Erreur au démarrage du serveur :', err);
  process.exit(1);
});