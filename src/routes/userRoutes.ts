import express, { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

/**
 * @openapi
 * /:
 *   get:
 *     summary: Message de bienvenue
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Message de bienvenue envoyé
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Bienvenue sur mon serveur API"
 */
router.get('/', userController.welcome);

/**
 * @openapi
 * /api/hello/{name}:
 *   get:
 *     summary: Salutation personnalisée avec timestamp
 *     tags: [Hello]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la personne à saluer
 *     responses:
 *       200:
 *         description: Salutation avec timestamp
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bonjour John"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-02-21T16:45:00.000Z"
 */
router.get('/api/hello/:name', userController.hello);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs (triés par nom)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nom:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 */
router.get('/api/users', userController.getAllUsers);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Dupont"
 *               email:
 *                 type: string
 *                 example: "dupont@email.com"
 *             required: [nom, email]
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nom:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Données invalides
 */
router.post('/api/users', userController.createUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur supprimé"
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/api/users/:id', userController.deleteUser);

export default router;
