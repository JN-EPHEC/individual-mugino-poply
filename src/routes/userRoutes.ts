import express, {Router, Request, Response} from 'express';

const router = Router();

// Route racine
router.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur API');
});

// Route /api/data
router.get('/api/data', (req: Request, res: Response) => {
    const etudiants = [
        { id: 1, nom: "Dupont", prenom: "Jean" },
        { id: 2, nom: "Martin", prenom: "Sophie" },
        { id: 1, nom: "Doe", prenom: "John" },        
    ];
    res.json(etudiants);
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

// Route /api/users
router.get('/api/users', (req: Request, res: Response) => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
    ];
    res.json(users);
})

export default router