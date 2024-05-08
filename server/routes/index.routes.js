import express from 'express';
import { dashboard } from '../controllers/dashboard.js';
import root from './root.routes.js';

const router = express.Router();

router.get('/', root);
router.get('/dashboard', dashboard);

export default router;