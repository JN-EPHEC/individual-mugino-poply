import express, {Application, Request, Response} from 'express';
import userRoutes from './routes/userRoutes';

const app: Application = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`)
});