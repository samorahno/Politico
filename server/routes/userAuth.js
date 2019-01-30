import express from 'express';
import UserAuthController from '../controllers/UserAuthController';
import ValidateCreateUser from '../middleware/ValidateCreateUser';

const { createUser } = UserAuthController;
const { validateCreate, validateLogin } = ValidateCreateUser;

const router = express.Router();


router.post('/signup', validateCreate, createUser);
router.post('/login', validateLogin);


export default router;
