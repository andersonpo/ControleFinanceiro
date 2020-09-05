import ISubCategory from './ISubCategory';

export default interface ICategoryWithSubCategories {
  Id: string;
  Name: string;
  Color: string;
  Icon: string;
  SubCategories?: Array<ISubCategory>;
}
