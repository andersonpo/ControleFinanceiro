import express from 'express';
import Auth from '../middlewares/auth';
import CategorySubCategoryService from '../services/category-subcategory-service';

const router = express.Router();
const service = new CategorySubCategoryService();
const auth = new Auth();

router.get('/', auth.required, service.listCategoriesWithSubCategories);
router.get('/:id', auth.required, service.findCategorySubCategoryById);
router.post('/', auth.required, service.createCategorySubCategory);
router.delete('/:id', auth.required, service.deleteCategorySubCategory);

export default router;
