import express, { Router } from 'express';
import * as userController from '../controllers/userController'

const router = Router();

// Route racine
router.get('/', userController.welcome);

// Route /api/hello/nom_dynamique
router.get('/api/hello/:name', userController.hello);

// Route /api/users lié à la DB
router.get('/api/users', userController.getAllUsers);

// Route post /api/users
router.post('/api/users', userController.createUser);

// Route delete /api/users/:id
router.delete('/api/users/:id', userController.deleteUser);

export default router