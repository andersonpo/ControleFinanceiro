import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/interfaces/icategory';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  id = '';
  category: ICategory = null;
  errorMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;

      if (this.id.length <= 0) {
        console.log('Category ID não informado!');
        this.router.navigate(['/category']);
      }
    });
  }

  ngOnInit(): void {
    this.categoryService.findById(this.id).subscribe(
      (response) => {
        this.category = response.result;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Falha ao recuperar os dados da Categoria.';
        if (error.status !== 401) {
          console.log(error);
        }
      }
    );
  }

  btnBack(): void {
    this.router.navigate(['/category']);
  }

}