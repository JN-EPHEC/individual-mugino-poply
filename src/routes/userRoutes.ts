import express, {Router, Request, Response} from 'express';
import User from '../models/User'

const router = Router();

// Route racine
router.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur API');
});

// Route /api/data liée à la DB
router.get('/api/data', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();  
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

// Route /api/hello/nom_dynamique
router.get('/api/hello/:name', (req: Request, res: Response) => {
    const timestamp = new Date();
    const nom = req.params.name;
    const reponse = {
        "message": `Bonjour ${nom}`,
        "timestamp": timestamp
    };
    res.json(reponse);
});

// Route /api/users lié à la DB
router.get('/api/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            order: [['nom', 'ASC']]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des users' });
    }
});

export default router