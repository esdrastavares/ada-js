import { Router, Response, Request, NextFunction } from 'express';
import { authenticate } from '../../../config/security';
import { validate } from '../../../middlewares/validation';
import { AuthService } from '../AuthService';
import { LoginController } from '../controller/LoginController';
import { LoginBodySchema } from '../dto/LoginRequest';

const authService: AuthService = new AuthService();
const loginController: LoginController = new LoginController(authService);

const router = Router();

/**
 * Rota express para o login.
 */
router.post(
  '/login',
  validate(LoginBodySchema),
  authenticate,
  (request: Request, response: Response, next: NextFunction) =>
    loginController.handler(request, response, next),
);

export default router;
