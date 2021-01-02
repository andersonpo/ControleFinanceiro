import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/icategory';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit {
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

  btnCancel(): void {
    this.router.navigate(['/category']);
  }

  btnConfirm(): void {
    this.categoryService.delete(this.id).subscribe(
      () => {
        this.errorMessage = '';
        this.router.navigate(['/category']);
      },
      (error) => {
        this.errorMessage = 'Falha ao excluir a Categoria.';
        if (error.status !== 401) {
          console.log(error);
        }
      }
    );
  }
}
