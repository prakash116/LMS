import express from 'express';
import { createLogin, login, resetPassword, sendOtp, verifyOtp } from '../controllers/login.controller.js';

const loginRouter = express.Router();

loginRouter.post('/create-login/:userid', createLogin)
loginRouter.post('/login', login)
loginRouter.post('/send-otp', sendOtp)
loginRouter.post('/verify-otp', verifyOtp)
loginRouter.post('/reset-user', resetPassword)

export default loginRouter;