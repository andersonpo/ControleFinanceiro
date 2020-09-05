import express from 'express';
import Auth from '../middlewares/auth';
import CategoryService from '../services/category-service';

const router = express.Router();
const service = new CategoryService();
const auth = new Auth();

router.get('/', auth.required, service.listCategories);
router.get('/:id', auth.required, service.findCategoryById);
router.get(
  '/:id/subcategory',
  auth.required,
  service.findCategoryWithSubCategoriesById
);
router.post('/', auth.required, service.createCategory);
router.delete('/:id', auth.required, service.deleteCategory);
router.put('/:id', auth.required, service.updateCategory);

export default router;
