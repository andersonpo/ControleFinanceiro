import express from 'express';
import Auth from '../middlewares/auth';
import SubCategoryService from '../services/subcategory-service';

const router = express.Router();
const service = new SubCategoryService();
const auth = new Auth();

router.get('/', auth.required, service.listSubCategories);
router.get('/:id', auth.required, service.findSubCategoryById);
router.post('/', auth.required, service.createSubCategory);
router.delete('/:id', auth.required, service.deleteSubCategory);
router.put('/:id', auth.required, service.updateSubCategory);

export default router;
