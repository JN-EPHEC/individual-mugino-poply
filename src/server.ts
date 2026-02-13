import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur API');
});

app.get('/api/data', (req: Request, res: Response) => {
    const etudiants = [
        { id: 1, nom: "Dupont", prenom: "Jean" },
        { id: 2, nom: "Martin", prenom: "Sophie" },
        { id: 1, nom: "Doe", prenom: "John" },        
    ];
    res.json(etudiants);
})



app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${3000}`)
});