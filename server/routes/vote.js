import express from 'express';
import verifyTokenObject from '../middleware/VerifyToken';


import VoteController from '../controllers/Vote';

const router = express.Router();
const { verifyToken } = verifyTokenObject;

const {
  createVote,
} = VoteController;


router.post('/vote', verifyToken, createVote);

export default router;
