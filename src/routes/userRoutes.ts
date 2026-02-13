import express, {Router, Request, Response} from 'express';

const router = Router();

// Route /api/users
router.get('/api/users', (req: Request, res: Response) => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
    ];
    res.json(users);
})

export default router