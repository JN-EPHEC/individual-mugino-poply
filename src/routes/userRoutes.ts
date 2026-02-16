import express, {Router, Request, Response} from 'express';
import User from '../models/User'

const router = Router();

// Route racine
router.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur API');
});

// Route /api/data liée à la DB avec stats
router.get('/api/data', async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.count();
        const derniersUsers = await User.findAll({
            limit: 3,
            order: [['createdAt', 'DESC']]
        });
        
        const longueurTotale = derniersUsers.reduce((sum, user) => sum + user.nom.length, 0);
        const moyenneNom = derniersUsers.length > 0 ? Math.round(longueurTotale / derniersUsers.length) : 0;
        
        res.json({
            statistiques: {
                total: totalUsers,
                moyenneLongueurNom: moyenneNom,
                derniers3: derniersUsers.length
            },
            derniersAjouts: derniersUsers.map(u => ({
                id: u.id,
                nom: u.nom,
                prenom: u.prenom,
                creeLe: u.createdAt.toISOString().split('T')[0]
            }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur calcul stats' });
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

// Route post /api/users
router.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
    }
});

// Route delete /api/users/:id
router.delete('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        await user.destroy();
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur suppression' });
    }
});

// Route get /api/users/:id
router.get('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


export default router