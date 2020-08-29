import express from 'express';
import Auth from './../middlewares/auth';
import UserService from '../services/user-service';
import uploads from '../middlewares/upload';

const router = express.Router();
const service = new UserService();
const auth = new Auth();

router.get('/', auth.required, service.listUsers);
router.get('/:id', auth.required, service.findUserById);
router.post('/', auth.required, service.createUser);
router.delete('/:id', auth.required, service.deleteUser);
router.put('/:id', auth.required, service.updateUser);
router.post(
  '/:id/photo',
  auth.required,
  uploads.single('photo'),
  service.uploadPhoto
);

export default router;
