import { Router } from 'express';
const router = Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'You are here /' });
});

export default router;
