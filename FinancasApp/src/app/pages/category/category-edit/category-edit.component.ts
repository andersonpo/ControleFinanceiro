import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
id = '';
  category: any = null;
  errorMessage = '';
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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

    this.updateForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      icon: new FormControl('', [Validators.minLength(2)]),
      color: new FormControl('', [Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
    this.categoryService.findById(this.id).subscribe(
      (response) => {
        this.category = response.result;
        this.errorMessage = '';

        this.updateForm.controls.name.setValue(this.category.Name);
        this.updateForm.controls.icon.setValue(this.category.Icon);
        this.updateForm.controls.color.setValue(this.category.Color);
      },
      (error) => {
        this.errorMessage = 'Falha ao recuperar os dados da categoria.';
        if (error.status !== 401) {
          console.log(error);
        }
      }
    );
  }

  btnBack(): void {
    const previousUrl = sessionStorage.getItem('url');
    if (previousUrl?.length > 0) {
      const objParams = JSON.parse(sessionStorage.getItem('urlParams'));
      sessionStorage.removeItem('url');
      sessionStorage.removeItem('urlParams');

      if (objParams !== null && objParams !== undefined) {
        this.router.navigate([previousUrl, objParams]);
      } else {
        this.router.navigate([previousUrl]);
      }
    } else {
      this.router.navigate(['/category']);
    }
  }

  updateUser(data): void {
    this.categoryService.update(this.id, data).subscribe(
      (response) => {
        this.errorMessage = '';
        this.category = response.result;
        this.router.navigate(['/category']);
      },
      (error) => {
        this.errorMessage = 'Falha ao atualizar a categoria.';
        if (error.status !== 401) {
          console.log(error);
        }
      }
    );
  }

}
