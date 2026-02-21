import express, { Request, Response } from 'express';
import User from '../models/User'

export const welcome = async (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur API');
};

export const hello = async (req: Request, res: Response) => {
    const timestamp = new Date();
    const nom = req.params.name;
    const reponse = {
        "message": `Bonjour ${nom}`,
        "timestamp": timestamp
    };
    res.json(reponse);
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            order: [['nom', 'ASC']]
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
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
}