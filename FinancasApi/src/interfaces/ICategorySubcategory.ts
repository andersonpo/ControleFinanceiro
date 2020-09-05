import ISubCategory from './ISubCategory';
import ICategory from './ICategory';

export default interface ICategorySubcategory {
  Id: string;
  Category: ICategory;
  SubCategory: ISubCategory;
}
