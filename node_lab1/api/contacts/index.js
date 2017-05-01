import express from 'express';
import contacts from './contacts';

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ contacts: contacts });
});

export default router;